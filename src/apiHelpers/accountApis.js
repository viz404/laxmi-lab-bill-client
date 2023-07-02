import { Keys } from "../config";

async function fetchAccount(doctorId) {
  try {
    const response = await fetch(`${Keys.baseUrl}/accounts/doctors/${doctorId}`);

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  fetchAccount,
};
