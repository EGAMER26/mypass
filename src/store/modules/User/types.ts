
// Action types
export enum UserTypes {
  GET_USER_REQUEST = "@repositories/GET_USER_REQUEST",
  UPDATE_USER_REQUEST = "@repositories/UPDATE_USER_REQUEST",
  LOAD_USER_SUCCES = "@repositories/LOAD_USER_SUCCES",
  LOAD_USER_FAILURE = "@repositories/LOAD_USER_FAILURE",
}

// Data types
  export interface ISenhas {
    id: number;
    nome?: string;
    senha?: string;
    createdAt?: string;
  }

  export interface IUser {
    id?: number;
    nome?: string | null;
    email?: string | null;
    senha?: string;
    profilePic?: string | null;
    typeAuth?: string | null;
    senhasSalvas?: ISenhas[];
    createdAt?: string;
  }

// State type

export interface RepositoriesState {
  readonly data: IUser;
  readonly loading: boolean;
  readonly error: boolean;
}
