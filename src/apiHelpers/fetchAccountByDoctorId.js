import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchAccountByDoctorId = async (id) => {
  return await axios.get(`${BASE_URL}/account/${id}`);
};

export default fetchAccountByDoctorId;
