import { Keys } from "../config";

export default async function deleteDoctor(id) {
  try {
    const repsonse = await fetch(`${Keys.baseUrl}/doctors/${id}`, {
      method: "DELETE",
    });

    const data = await repsonse.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
