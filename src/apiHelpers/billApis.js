import { Keys } from "../config";

async function addBill(bill) {
  try {
    const response = await fetch(`${Keys.baseUrl}/bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bill),
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

export default {
  addBill,
};
