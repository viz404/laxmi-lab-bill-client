import { Keys } from "../config";

async function addPayment(payment) {
  try {
    const response = await fetch(`${Keys.baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
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
  addPayment,
};
