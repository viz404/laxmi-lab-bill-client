import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const loadAccounts = (payload) => {
  return {
    type: "ACCOUNT/LOAD",
    payload,
  };
};

export const loadAccountsHelper = (toast, page, search, limit) => {
  return async (dispatch, getState) => {
    try {
      const { data, headers } = await axios.get(
        `${BASE_URL}/account?_limit=${limit || "10"}&_page=${
          page || "1"
        }&doctor_name=${search || ""}`
      );
      const total = headers.get("X-Total-Count");
      dispatch(loadAccounts({ data: data.response, total }));
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
