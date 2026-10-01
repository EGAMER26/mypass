import {
  call,
  put,
  Effect,
  ForkEffect,
  all,
  takeLatest,
} from "redux-saga/effects";
import { api } from "@/services/api";
import { ActionType } from "typesafe-actions";
import {
  loadSucces,
  loadFailure,
  loadUserRequest,
  updateUserRequest,
} from "./actions";
import { IUser, UserTypes } from "./types";

interface ApiResponse {
  data: IUser[];
}

function* getUser(
  action: ActionType<typeof loadUserRequest>
): Generator<Effect, void, unknown> {
  try {
    const email = action.payload;
    const response = (yield call(api.get, "/vault")) as { data: Array<{ id: string; name: string; password: string; createdAt?: string }> };
    yield put(loadSucces({ email, senhasSalvas: response.data.map((item) => ({ id: item.id, nome: item.name, senha: item.password, createdAt: item.createdAt })) }));
  } catch (error: unknown) {
    yield put(loadFailure());
    if (error instanceof Error) {
      console.log("error", error.message);
    } else {
      console.log("Unknown error", error);
    }
  }
}

function* updateUser(
  action: ActionType<typeof updateUserRequest>
): Generator<Effect, void, unknown> {
  const { email, senhasSalvas, nome } = action.payload;
  try {
    if (!senhasSalvas) {
      yield call(api.patch, "/profile", { name: nome, email });
      yield put(loadUserRequest(email));
      return;
    }
    (
      yield call(api.put, "/vault", { items: (senhasSalvas ?? []).map((item) => ({ name: item.nome ?? "Senha", password: item.senha ?? "" })) })
    ) as ApiResponse; // 👈 ajuste aqui!

    yield put(loadUserRequest(email));
  } catch (error: unknown) {
    yield put(loadFailure());
    if (error instanceof Error) {
      console.log("error", error.message);
    } else {
      console.log("Unknown error", error);
    }
  }
}

export default all<ForkEffect<never>>([
  takeLatest(UserTypes.GET_USER_REQUEST, getUser),
  takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
]);
