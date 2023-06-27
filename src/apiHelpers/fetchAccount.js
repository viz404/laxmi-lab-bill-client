import { Keys } from "../config";

export default async function fetchAccount(doctorId) {
  try {
    const response = await fetch(`${Keys.baseUrl}/doctors/${doctorId}`);

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
