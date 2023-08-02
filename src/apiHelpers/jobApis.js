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

async function fetchJobs({
  page = 1,
  limit = 20,
  doctor_name = "",
  sort = "",
}) {
  try {
    const response = await fetch(
      `${Keys.baseUrl}/jobs?page=${page}&limit=${limit}&doctor_name=${doctor_name}&sort=${sort}`
    );

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchJobsWithPrice({ doctor_id, from_date, to_date }) {
  try {
    if (!doctor_id) {
      throw new Error("no doctor_id received");
    }

    if (!from_date) {
      throw new Error("no from_date received");
    }

    if (!to_date) {
      throw new Error("no to_date received");
    }

    const response = await fetch(
      `${Keys.baseUrl}/jobs/price/doctor/${doctor_id}?from_date=${from_date}&to_date=${to_date}`
    );

    const data = await response.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteJob(id) {
  try {
    if (!id) throw new Error("No Id received");

    const response = await fetch(`${Keys.baseUrl}/jobs/${id}`, {
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

export default {
  addNewJob,
  fetchJob,
  updateJob,
  fetchJobs,
  fetchJobsWithPrice,
  deleteJob
};
