import { Keys } from "../config";

export default async function deleteWork(id) {
  try {
    const response = await fetch(`${Keys.baseUrl}/works/${id}`, {
      method: "DELETE",
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
