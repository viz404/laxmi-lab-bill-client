import { Keys } from "../config";

async function fetchDoctors({ page = 1, limit = 10, name = "", sort = "" }) {
  try {
    const response = await fetch(
      `${Keys.baseUrl}/doctors?page=${page}&limit=${limit}&name=${name}&sort=${sort}`
    );

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default fetchDoctors;
