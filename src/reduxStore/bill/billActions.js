import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const loadBill = (payload) => {
  return {
    type: "BILL/LOAD",
    payload,
  };
};

export const loadBillHelper = (toast, page, search) => {
  return async (dispatch, getState) => {
    try {
      const { data, headers } = await axios.get(
        `${BASE_URL}/bill?_limit=30&_page=${page || "1"}&doctor_name=${
          search || ""
        }`
      );
      const total = headers.get("X-Total-Count");
      dispatch(loadBill({ data: data.response, total }));
    } catch (error) {
      console.error(error);
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

export const addBillHelper = (bill, toast, navigate) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/bill`, bill);
      toast({
        title: "Success",
        description: "Bill generation successfull",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/print/${data.response._id}`);
    } catch (error) {
      console.error(error);
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
