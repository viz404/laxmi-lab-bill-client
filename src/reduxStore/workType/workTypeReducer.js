const initialState = {
  types: [],
  isLoading: false,
  isError: false,
  showMessage: false,
  message: "",
};

const workTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WORKTYPE/ADD": {
      return {
        types: [...state.types, action.payload],
        isLoading: false,
        isError: false,
        showMessage: false,
        message: "",
      };
    }
    case "WORKTYPE/LOAD": {
      return {
        types: [...action.payload],
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

export default workTypeReducer;
