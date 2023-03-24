import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchBillById = async (id) => {
  return await axios.get(`${BASE_URL}/bill/${id}`);
};

export default fetchBillById;
