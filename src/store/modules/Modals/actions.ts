import { action } from 'typesafe-actions';
import { UserTypes, IModals } from './types';


export const updateModals = ({passwords, perfil, login, cadastro, profile}: IModals) => action(UserTypes.GET_MODALS_REQUEST, {passwords, perfil, login, cadastro, profile});

export const loadSucces = (data: IModals) =>
  action(UserTypes.LOAD_MODALS_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_MODALS_FAILURE);

