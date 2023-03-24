const initialState = {
  doctors: [],
  total: 0,
  isLoading: false,
  isError: false,
  showMessage: false,
  message: "",
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOCTOR/LOAD": {
      return {
        doctors: action.payload.data,
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

export default doctorReducer;
