import { combineReducers } from "redux";
import billReducer from "./bill/billReducer";

import doctorReducer from "./doctor/doctorReducer";
import jobReducer from "./jobs/jobReducer";
import workTypeReducer from "./workType/workTypeReducer";
import paymentReducer from "./payment/paymentReducer";

const rootReducer = combineReducers({
  doctor: doctorReducer,
  work: workTypeReducer,
  bill: billReducer,
  job: jobReducer,
  payment: paymentReducer,
});

export default rootReducer;
