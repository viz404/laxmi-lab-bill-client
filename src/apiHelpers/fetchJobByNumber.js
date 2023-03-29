import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchJobByNumber = async (jobNumber) => {
  return await axios.get(`${BASE_URL}/job?job_number=${jobNumber}`);
};

export default fetchJobByNumber;
