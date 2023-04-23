import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const makePayment = async (payment) => {
  return await axios.post(`${BASE_URL}/payment`, payment);
};

export default makePayment;
