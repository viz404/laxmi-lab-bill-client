import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const addJob = (payload) => {
  return {
    type: "JOB/ADD",
    payload,
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
      console.error(error.message);
      toast({
        title: "Something went wrong",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
};
