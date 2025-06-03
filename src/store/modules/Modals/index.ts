import { Reducer } from "redux";
import { IModals, RepositoriesState, UserTypes } from "./types";

const INNITAL_STATE: RepositoriesState = {
  data: {
    passwords: false,
    perfil: false,
    login: false,
    cadastro: false,
    profile: false,
  },
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof UserTypes.LOAD_MODALS_SUCCES;
  payload: { data: IModals };
}

interface GetCartRequestAction {
  type: typeof UserTypes.GET_MODALS_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof UserTypes.LOAD_MODALS_FAILURE;
}

type CartAction =
  | GetCartRequestAction
  | LoadCartSuccessAction
  | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (
  state = INNITAL_STATE,
  action
) => {
  switch (action.type) {
    case UserTypes.GET_MODALS_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_MODALS_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_MODALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: INNITAL_STATE.data,
      };
    default:
      return state;
  }
};

export default reducer;
