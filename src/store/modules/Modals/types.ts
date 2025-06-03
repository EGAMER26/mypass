// Action types
export enum UserTypes {
  GET_MODALS_REQUEST = "@repositories/GET_MODALS_REQUEST",
  LOAD_MODALS_SUCCES = "@repositories/LOAD_MODALS_SUCCES",
  LOAD_MODALS_FAILURE = "@repositories/LOAD_MODALS_FAILURE",
}

// Data types

export interface IModals {
  passwords?: boolean;
  perfil?: boolean;
  login?: boolean;
  cadastro?: boolean;
  profile?: boolean;
}

// State type

export interface RepositoriesState {
  readonly data: IModals;
  readonly loading: boolean;
  readonly error: boolean;
}
