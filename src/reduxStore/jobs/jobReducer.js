const initialState = {
  jobs: [],
  total: 0,
  isLoading: false,
  isError: false,
  showMessage: false,
  message: "",
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "JOB/LOAD": {
      return {
        jobs: action.payload.data,
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

export default jobReducer;
