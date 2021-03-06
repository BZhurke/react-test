import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) =>{
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

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDr9b3UEKz_2wUdMA5d6t8H2f-dGo6k_R8';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDr9b3UEKz_2wUdMA5d6t8H2f-dGo6k_R8'
        }
        axios.post(url,authData)
            .then(response =>{
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            })
    };
};