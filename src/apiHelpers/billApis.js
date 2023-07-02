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

async function getBill(id) {
  try {
    if (!id) {
      throw new Error("no id received");
    }

    const response = await fetch(`${Keys.baseUrl}/bills/${id}`);

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
  getBill,
};
