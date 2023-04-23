import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchTransactionsByDoctorId = async (id, fromDate, tillDate) => {
  return await axios.get(
    `${BASE_URL}/transaction/${id}?from_date=${fromDate}&till_date=${tillDate}`
  );
};

export default fetchTransactionsByDoctorId;
