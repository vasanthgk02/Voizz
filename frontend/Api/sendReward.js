import apiClient from "./client";

const updateReward = (data) => apiClient.post("/reward", data);

export default { updateReward };
