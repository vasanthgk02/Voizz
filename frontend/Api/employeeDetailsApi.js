import apiClient from "./client";

const getDetails = (data) => apiClient.get("/details");

export default { getDetails };
