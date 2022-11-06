import apiClient from "./client";

const putEmployee = (data) => apiClient.post("/putEmployee", data);

export default { putEmployee };
