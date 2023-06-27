import { Keys } from "../config";

async function addNewWork(title) {
  try {
    const response = await fetch(`${Keys.baseUrl}/works`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
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

async function deleteWork(id) {
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

async function fetchWorks() {
  try {
    const response = await fetch(`${Keys.baseUrl}/works`);

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
  fetchWorks,
  addNewWork,
  deleteWork,
};
