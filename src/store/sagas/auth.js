import { put, delay } from 'redux-saga/effects';
import axios from 'axios';


import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('BBToken');
    yield localStorage.removeItem('BBexpirationDate');
    yield localStorage.removeItem('BBuserId');
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCkvOvtY8wXFI94PgQM-qebUylaxtNkCLA';
    if (!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCkvOvtY8wXFI94PgQM-qebUylaxtNkCLA';
    }
    try{
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('BBToken', response.data.idToken);
        yield localStorage.setItem('BBexpirationDate', expirationDate);
        yield localStorage.setItem('BBuserId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    }catch(error){
        yield put(actions.authFail(error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('BBToken');
    if(!token){
        yield put(actions.logout());
    }else{
        const expirationDate = yield new Date(localStorage.getItem('BBexpirationDate'));
        if(expirationDate > new Date()) {
            const userId = yield localStorage.getItem('BBuserId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }else{
            yield put(actions.logout());
        }
    }
}