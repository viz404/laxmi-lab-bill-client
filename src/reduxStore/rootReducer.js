import { combineReducers } from "redux";
import billReducer from "./bill/billReducer";

import doctorReducer from "./doctor/doctorReducer";
import workTypeReducer from "./workType/workTypeReducer";

const rootReducer = combineReducers({
  doctor: doctorReducer,
  work: workTypeReducer,
  bill: billReducer,
});

export default rootReducer;
