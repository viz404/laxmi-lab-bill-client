const initialState = {
  bills: [],
  total: 0,
  isLoading: false,
  isError: false,
  showMessage: false,
  message: "",
};

const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BILL/LOAD": {
      return {
        bills: action.payload.data,
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

export default billReducer;
