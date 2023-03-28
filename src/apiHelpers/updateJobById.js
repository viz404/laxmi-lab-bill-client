import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const updateJobById = async (id, updatedJob) => {
  return await axios.patch(`${BASE_URL}/job/${id}`, updatedJob);
};

export default updateJobById;
