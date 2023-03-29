import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const fetchJobsNoLimit = async ({ doctor_id, from_date, till_date }) => {
  return await axios.get(
    `${BASE_URL}/job?doctor_id=${doctor_id}&from_date=${from_date}&till_date=${till_date}&no_limits=true`
  );
};

export default fetchJobsNoLimit;
