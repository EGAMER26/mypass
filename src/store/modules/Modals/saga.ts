import { put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { loadSucces, updateModals } from './actions';
import { UserTypes } from './types';



function* setSideBar(action: ActionType<typeof updateModals>): Generator<Effect, void, unknown> {
    const {perfil, passwords, login, cadastro, profile} = action.payload;
console.log('profile', profile)
    yield put(loadSucces({passwords, perfil, login, cadastro, profile}));

}


export default all<ForkEffect<never>>([
  takeLatest(UserTypes.GET_MODALS_REQUEST, setSideBar),
])
