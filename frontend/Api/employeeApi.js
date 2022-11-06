import apiClient from "./client";

const getEmployee = (data) => apiClient.post("/emp", data);
const getHist = () => apiClient.get("/empHist");

export default { getEmployee, getHist };
