import { Keys } from "../config";

async function addNewJob(job) {
  try {
    if (!job) throw new Error("no job recieved");

    const response = await fetch(`${Keys.baseUrl}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
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

async function fetchJob(id) {
  try {
    if (!id) throw new Error("No Id received");

    const response = await fetch(`${Keys.baseUrl}/jobs/${id}`);

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateJob(job, id) {
  try {
    if (!job) throw new Error("no job recieved");

    if (!id) throw new Error("no id received");

    const response = await fetch(`${Keys.baseUrl}/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
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
  addNewJob,
  fetchJob,
  updateJob,
};
