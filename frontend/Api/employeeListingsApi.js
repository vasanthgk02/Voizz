import client from "./client";

const endpoint = "/emp";
const getEmployeeListings = () => client.get(endpoint);

export default { getEmployeeListings };
