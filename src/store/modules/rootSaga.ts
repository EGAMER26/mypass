import { all } from "redux-saga/effects";

import User from "./User/saga";
import Users from "./Users/saga";
import Modals from "./Modals/saga";

export default function* rootSaga(): Generator {
  return yield all([
    User,
    Users,
    Modals,
  ]);
}
