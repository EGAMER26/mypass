  import {
    call,
    put,
    Effect,
    ForkEffect,
    all,
    takeLatest,
  } from "redux-saga/effects";
  import {api} from "@/services/api";
  import { loadSucces, loadFailure, postUsersRequest, loadUsersRequest } from "./actions";
  import { UserTypes } from "./types";
  import { ActionType } from "typesafe-actions";


  function* getUsers(): Generator<Effect, void, unknown> {
    try {
      yield put(loadSucces([]));
      
    } catch (error: unknown) {
      yield put(loadFailure());
      if (error instanceof Error) {
        console.log("error", error.message);
      } else {
        console.log("Unknown error", error);
      }
    }
  }


  function* postUsers(action: ActionType<typeof postUsersRequest>): Generator<Effect, void, unknown> {
    try {
      yield call(api.post, "/account", { name: action.payload.nome, email: action.payload.email, password: action.payload.senha });
      yield put(loadUsersRequest());
    } catch {
      yield put(loadFailure());
    }
  }
  


  export default all<ForkEffect<never>>([
    takeLatest(UserTypes.GET_USERS_REQUEST, getUsers),
    takeLatest(UserTypes.POST_USERS_REQUEST, postUsers),
  ]);
