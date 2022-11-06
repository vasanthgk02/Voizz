import apiClient from "./client";

const getWallet = () => apiClient.get("/org");

export default { getWallet };
