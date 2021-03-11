// import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const logout = () => {
    // localStorage.removeItem('BBToken');
    // localStorage.removeItem('BBexpirationDate');
    // localStorage.removeItem('BBuserId');
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};



// thunk middleware asynchronous functions
export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('BBToken');
    //     if(!token){
    //         dispatch(logout())
    //     }else{
    //         const expirationDate = new Date(localStorage.getItem('BBexpirationDate'));
    //         if(expirationDate > new Date()) {
    //             const userId = localStorage.getItem('BBuserId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
    //         }else{
    //             dispatch(logout());
    //         }
    //     }
    // }

    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
}

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(()=>{
    //         dispatch(logout());
    //     }, expirationTime * 1000)
    //}
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const auth = (email, password, isSignup) => {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };
    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCkvOvtY8wXFI94PgQM-qebUylaxtNkCLA';
    //     if (!isSignup) {
    //         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCkvOvtY8wXFI94PgQM-qebUylaxtNkCLA';
    //     }
    //     axios.post(url, authData)
    //         .then(response => {
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('BBToken', response.data.idToken);
    //             localStorage.setItem('BBexpirationDate', expirationDate);
    //             localStorage.setItem('BBuserId', response.data.localId)
    //             dispatch(authSuccess(response.data.idToken, response.data.localId));
    //             dispatch(checkAuthTimeout(response.data.expiresIn))
    //         })
    //         .catch(err => {
    //             dispatch(authFail(err));
    //         });
    // };
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup 
    }
};