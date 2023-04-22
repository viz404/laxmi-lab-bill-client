const initialState = {
  accounts: [],
  total: 0,
  isLoading: false,
  isError: false,
  showMessage: false,
  message: "",
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACCOUNT/LOAD": {
      return {
        accounts: action.payload.data,
        total: action.payload.total,
        isLoading: false,
        isError: false,
        showMessage: false,
        message: "",
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
