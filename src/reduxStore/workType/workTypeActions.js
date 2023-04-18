import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const addWorkType = (payload) => {
  return {
    type: "WORKTYPE/ADD",
    payload,
  };
};

const loadWorkTypes = (payload) => {
  return {
    type: "WORKTYPE/LOAD",
    payload,
  };
};

const deleteWorkType = (payload) => {
  return {
    type: "WORKTYPE/DELETE",
    payload,
  };
};

export const loadWorkTypesHelper = (toast) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/work`);
      dispatch(loadWorkTypes(data.response));
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

export const addWorkTypeHelper = (title, toast) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/work`, {
        title,
      });

      dispatch(addWorkType({ title, _id: data.response._id }));
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

export const deleteWorkTypeHelper = (id, toast) => {
  return async (dispatch, getState) => {
    try {
      await axios.delete(`${BASE_URL}/work/${id}`);
      // dispatch(loadWorkTypesHelper(toast));
      dispatch(deleteWorkType(id));
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
