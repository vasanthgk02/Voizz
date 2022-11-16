import apiClient from "./client";

const sendEmail = (emailAddr, name, pass) =>
  apiClient.post("/sendEmail", { email: emailAddr, name: name, pass: pass });

const authEmail = (email) => apiClient.post("/authEmail", { email: email });

const sendSMS = (name, phoneNo, sigma) =>
  apiClient.post("/sendSMS", {
    name: name,
    sigma: sigma,
    phoneNo: "+91" + phoneNo,
  });

const sendWhatsapp = async (name, phoneNo) => {
  apiClient.post("/sendWhatsapp", { name: name, phoneNo: phoneNo });
};

export default { sendEmail, sendSMS, sendWhatsapp, authEmail };
