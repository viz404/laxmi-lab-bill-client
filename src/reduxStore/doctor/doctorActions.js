import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const loadDoctors = (payload) => {
  return {
    type: "DOCTOR/LOAD",
    payload,
  };
};

export const loadDoctorsHelper = (toast, page = 1, search = "", limit = 10) => {
  return async (dispatch, getState) => {
    try {
      const { data, headers } = await axios.get(
        `${BASE_URL}/doctor?_limit=${limit}&_page=${page}&name=${search}`
      );
      const total = headers.get("X-Total-Count");
      dispatch(loadDoctors({ data: data.response, total }));
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error?.response?.data.error || error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
};

export const addDoctorHelper = (doctor, toast, navigate) => {
  return async (dispatch, getState) => {
    try {
      await axios.post(`${BASE_URL}/doctor`, doctor);
      toast({
        title: "Success",
        description: `Doctor ${doctor.name} was added`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/doctors");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error?.response?.data.error || error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
};

export const deleteDoctorHelper = (id, name, toast) => {
  return async (dispatch, getState) => {
    try {
      await axios.delete(`${BASE_URL}/doctor/${id}`);
      toast({
        title: "Success",
        description: `Doctor ${name || ""} was deleted`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch(loadDoctorsHelper(toast, 1));
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error?.response?.data.error || error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
};

export const updateDoctorHelper = (doctor, toast, navigate) => {
  return async (dispatch, getState) => {
    try {
      await axios.patch(`${BASE_URL}/doctor/${doctor._id}`, doctor);
      toast({
        title: "Success",
        description: `Doctor ${doctor.name} was updated`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/doctors");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error?.response?.data.error || error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
};
