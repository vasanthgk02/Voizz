import apiClient from "./client";

const getOrganization = (data) => apiClient.post("/org", data);

export default { getOrganization };
