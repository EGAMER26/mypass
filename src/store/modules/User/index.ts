import { Reducer } from 'redux';
import { RepositoriesState, UserTypes, IUser } from './types';

const INNITAL_STATE: RepositoriesState = {
  data: {
    id: undefined,
    nome: null,
    email: null,
    profilePic: null,
    typeAuth: null,
    senhasSalvas: [],
    createdAt: undefined,
  },
  error: false,
  loading: false,
};

interface LoadUserSuccessAction {
  type: typeof UserTypes.LOAD_USER_SUCCES;
  payload: { data: IUser };
}

interface UpdateUserAction {
  type: typeof UserTypes.UPDATE_USER_REQUEST;
  payload: { data: IUser };
}

interface GetUserRequestAction {
  type: typeof UserTypes.GET_USER_REQUEST;
}

interface LoadUserFailureAction {
  type: typeof UserTypes.LOAD_USER_FAILURE;
}

type UserAction = GetUserRequestAction | UpdateUserAction | LoadUserSuccessAction | LoadUserFailureAction;

const reducer: Reducer<RepositoriesState, UserAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.GET_USER_REQUEST:
      return { ...state, loading: true };
      case UserTypes.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_USER_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_USER_FAILURE:
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
