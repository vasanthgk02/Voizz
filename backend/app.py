from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from trycourier import Courier
import json 
   
import pymongo
import pickle
import numpy as np
import librosa
import soundfile
import hashlib

import warnings
warnings.filterwarnings("ignore")

def extract_feature(file_name, mfcc, chroma, mel):
    with soundfile.SoundFile(file_name) as sound_file:
        X = sound_file.read(dtype="float32")
        sample_rate = sound_file.samplerate
        if chroma:
            stft = np.abs(librosa.stft(X))
        result = np.array([])
        if mfcc:
            mfccs = np.mean(librosa.feature.mfcc(
                y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
            result = np.hstack((result, mfccs))
        if chroma:
            chroma = np.mean(librosa.feature.chroma_stft(
                S=stft, sr=sample_rate).T, axis=0)
            result = np.hstack((result, chroma))
        if mel:
            mel = np.mean(librosa.feature.melspectrogram(
                X, sr=sample_rate).T, axis=0)
            result = np.hstack((result, mel))
    return result


filename = 'modelForPrediction.sav'
loaded_model = pickle.load(open(filename, 'rb'))

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['Voizz']
org = db["Organization"]
emp = db["Employee"]

filename = 'modelForPrediction.sav'
loaded_model = pickle.load(open(filename, 'rb'))

app = Flask(__name__)
CORS(app)


@app.route('/server')
def display():
    return "Server running successfully"

@app.route('/analyze', methods=['POST'])
def analyze():
    if request.method == 'POST':
        bytesOfImage = request.get_data()
        with open('output.wav', 'wb') as out:
            out.write(bytesOfImage)
        audio_file = 'output.wav'
        feature = extract_feature(audio_file, mfcc=True, chroma=True, mel=True)
        feature = feature.reshape(1, -1)
        prediction = loaded_model.predict(feature)
        prediction = prediction[0]        
        return prediction

@app.route('/org', methods = ['POST', 'GET'])
def organization():
    if(request.method == 'POST'):        
        req_text = request.get_json()
        username = req_text['username']
        password = req_text['password']
        hashed_username = hashlib.sha256(username.encode('utf-8')).hexdigest()        
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        queryOrg = { "username": hashed_username, "password" : hashed_password }
        res = org.find(queryOrg)
        res_len = len(list(res))
        return "success" if res_len > 0 else "fail"
    elif(request.method == "GET"):
        res = list(org.find())
        return json.dumps(list(org.find()))

empEmail = ""
empPass = ""

@app.route('/emp', methods = ['POST', 'GET'])
def employee():    
    if(request.method == 'POST'):
        req_text = request.get_json()
        email = req_text['email']
        password = req_text['password']      
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        queryOrg = { "email": email, "password" : hashed_password }
        res = emp.find(queryOrg)
        res_len = len(list(res))
        if(res_len > 0) :
            global empEmail            
            empEmail = email
            global empPass
            empPass = hashed_password
        return "success" if res_len > 0 else "fail"
    if(request.method == "GET"):
        res = emp.find()
        return list(res)

@app.route('/details', methods = ['GET'])
def employeeDetails():    
    if(request.method == 'GET'):
        global empEmail
        global empPass
        queryOrg = { "email": empEmail, "password" : empPass}
        res = emp.find(queryOrg)        
        return list(res)

@app.route("/putEmployee", methods = ["POST"])
def newEmployee():
    if(request.method == "POST"):
        data = request.get_json()
        password = data['password']        
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        print(data)
        empDetails = {'_id': data['_id'], 'url': data['url'], 'name': data['name'], 'email': data['email'], 'password': hashed_password, 'walletBalance': 0, 'audioHistory': [], 'description': 'New User', "phoneNo" : data['phoneNo']}        
        emp.insert_one(empDetails)
        return "success"

@app.route("/empHist", methods = ["GET"])
def empWallet():
    if(request.method == "GET"):
        res = (org.find({'sentHistory':{'$elemMatch':{'email' : empEmail}}}, {"sentHistory" : 1}));  
        res = list(res)[0]['sentHistory']
        return_res =[]
        for x in res:
            if x['email'] == empEmail:
                return_res.append(x)
        return return_res

@app.route("/reward", methods = ["POST"])
def updateReward():
    if(request.method == "POST"):
        json = request.get_json()        
        myquery1 = {'name' : json['name'] , 'email' : json['email']}
        myquery2 = {'_id' : 0}
        res1 = emp.find(myquery1)
        res2 = org.find(myquery2)
        empBal = list(res1)[0]['walletBalance']
        orgBal = list(res2)[0]['walletBalance']
        newvalue1 = { "$set": { "walletBalance": empBal +  json['reward'], "description" : "Last Result : " + json["result"]} }
        newvalue2 = { "$set": { "walletBalance": orgBal -  json['reward']} }
        emp.update_one(myquery1, newvalue1)
        org.update_one(myquery2, newvalue2)        
        emp.update_one({"email" : json["email"]}, {"$set" : { "description" : "Last Review : " +json["result"]}})
        org.update_one({},{"$push": { "sentHistory": { "name": json["name"], "email": json["email"], "audioName": json["audioName"], "value": json["reward"] } } })
        emp.update_one({"name" : json["name"], "email" : json["email"]}, {"$push" : {"audioHistory" : {"result" : json["result"], "audioName" : json["audioName"], "result" : json["result"]}}})
        return "success"

######### COURIER API SERVICES ######

client = Courier(auth_token="pk_prod_H377WMT114M4ZZH29WTEYX3Z7G2J")

@app.route("/sendSMS", methods = ["POST"])
def sendSMS():
    if(request.method == "POST"):
        json = request.get_json()
        resp = client.send_message(
            message={
                "to": {
                "phone_number": json["phoneNo"],
                },
                "template": "TDSWC4ETARMNF9G6G7TBG67PBXP6",
                "data": {
                "name": json["name"],
                "value": json["sigma"],
                },
            }
        )
        return ""
        

@app.route("/sendEmail", methods = ["POST"])
def sendEmail():
    if(request.method == "POST"):
        print((request.get_json()))
        json = request.get_json()
        resp = client.send_message(
            message={
                "to": {
                "email": json["email"],
                },
                "template": "XRYYXR3S944A61GN0ZESWRDHQXWJ",
                "data": {
                "name": json["name"],
                "email": json["email"],
                "pass": json["pass"],
                },
            }
        )
        return ""

@app.route("/authEmail", methods = ["POST"])
def authEmail():
    if(request.method == "POST"):
        json = request.get_json()
        resp = client.send_message(
        message={
                "to": {
                "email": json["email"],
                },
                "template": "YHF6XT797P4ARBNP86GS1C59RX0V",
                "data": {
                },
            }
        )
        return ""

@app.route("/sendWhatsapp", methods = ["POST"])
def sendWhatsapp():
    if(request.method == "POST"):
        json = request.get_json()
        resp = client.send_message(
            message={
                "to": {
                "phone_number": "+91" + json["phoneNo"],
                },
                "template": "9S9RGM97ZDMDQ5KM9YC0S3P6EHP2",
                "data": {
                "name": json["name"],
                },
            }
        )
        return ""


if __name__ == '__main__':
    app.run(host='localhost', port=5000)
