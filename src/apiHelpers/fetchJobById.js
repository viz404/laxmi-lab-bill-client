import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchJobById = async (id) => {
  return await axios.get(`${BASE_URL}/job/${id}`);
};

export default fetchJobById;
