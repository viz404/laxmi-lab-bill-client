import { Keys } from "../config";

async function addNewDoctor(doctor) {
  try {
    const response = await fetch(`${Keys.baseUrl}/doctors`, {
      method: "POST",
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

async function deleteDoctor(id) {
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

async function fetchDoctorById(id) {
  try {
    const repsonse = await fetch(`${Keys.baseUrl}/doctors/${id}`);

    const data = await repsonse.json();

    if (data.status == false) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchDoctors({ page = 1, limit = 10, name = "", sort = "" }) {
  try {
    const response = await fetch(
      `${Keys.baseUrl}/doctors?page=${page}&limit=${limit}&name=${name}&sort=${sort}`
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

async function updateDoctor(id, doctor) {
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

async function fetchDoctorNames(name = "") {
  try {
    const response = await fetch(`${Keys.baseUrl}/doctors/names?name=${name}`);

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
  fetchDoctors,
  addNewDoctor,
  fetchDoctorById,
  updateDoctor,
  deleteDoctor,
  fetchDoctorNames,
};
