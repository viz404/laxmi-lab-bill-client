import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchDoctorById = async (id) => {
  return await axios.get(`${BASE_URL}/doctor/${id}`);
};

export default fetchDoctorById;
