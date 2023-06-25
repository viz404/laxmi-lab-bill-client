import { Keys } from "../config";

export default async function updateDoctor(id, doctor) {
  try {
    const response = await fetch(`${Keys.baseUrl}/doctors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}