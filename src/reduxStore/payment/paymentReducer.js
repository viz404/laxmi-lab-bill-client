const initialState = {
  payments: [],
  total: 0,
  isLoading: false,
  isError: false,
  showMessage: false,
  message: "",
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PAYMENT/LOAD": {
      return {
        payments: action.payload.data,
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

export default paymentReducer;
