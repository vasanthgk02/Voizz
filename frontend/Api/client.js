import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.29.246:5000/",
});

export default apiClient;
