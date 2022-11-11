import { combineReducers } from "redux";
import commonReducer from "./common/commonReducer";

const rootReducer = combineReducers({
  common: commonReducer,
})
export type State = ReturnType<typeof rootReducer>;
export default rootReducer;