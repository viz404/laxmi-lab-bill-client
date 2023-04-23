import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const loadJobs = (payload) => {
  return {
    type: "JOB/LOAD",
    payload,
  };
};

export const loadJobsHelper = ({
  toast,
  doctor_id = "",
  from_date = "",
  till_date = "",
  _limit = "",
  _page = "",
}) => {
  return async (dispatch, getState) => {
    try {
      const { data, headers } = await axios.get(
        `${BASE_URL}/job?doctor_id=${doctor_id}&from_date=${from_date}&till_date=${till_date}&_limit=${_limit}&_page=${_page}`
      );
      const total = headers.get("X-Total-Count");
      dispatch(loadJobs({ data: data.response, total }));
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

export const addJobHandler = (job, toast, navigate) => {
  return async (dispatch, getState) => {
    try {
      for (let work of job.works) {
        if (work._id) {
          delete work._id;
        }
      }

      await axios.post(`${BASE_URL}/job`, job);
      toast({
        title: "Success",
        description: "Job added successfully",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
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

export const updateJobHandler = (job, toast, navigate) => {
  return async (dispatch, getState) => {
    try {
      for (let work of job.works) {
        if (work._id) {
          delete work._id;
        }
      }

      await axios.patch(`${BASE_URL}/job/${job._id}`, job);
      toast({
        title: "Success",
        description: "Job updated successfully",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
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

export const deleteJobHelper = ({ id, number, toast }) => {
  return async (dispatch, getState) => {
    try {
      await axios.delete(`${BASE_URL}/job/${id}`);
      toast({
        title: "Success",
        description: `Job number: ${number || ""} was deleted`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch(loadJobsHelper({ toast }));
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
