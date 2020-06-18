import * as actions from './actions';
import { cloneDeep } from 'lodash';

const initialState = {
    username: "Guest...Login",
    email: "",
    token: "",
    loggedIn: false,
    campGrounds: []
}


export const todoReducer = (state = initialState, action) => {
    const newState = cloneDeep(state);
    switch (action.type) {

        case actions.LOGIN_USER:
            newState.username = action.user.username;
            newState.email = action.user.email;
            newState.token = action.user.token;
            newState.loggedIn = true;
            newState.errorMessage = null;
            console.log("new state.username: ", newState.username);
            return newState;

        case actions.REGISTER_USER:
            newState.username = "Registered...OK";
            newState.email = "";
            // newState.token = action.token;
            newState.loggedIn = true;
            // console.log("new state.username: ", newState.username);
            return newState;

        case actions.LOGIN_ERROR:
            newState.username = "wrong email or pswd";
            newState.email = "";
            newState.token = "";
            newState.loggedIn = false;
            newState.errorMessage = action.message;
            // console.log("new LOGOUT_USER newstate.errorMessage: ", newState.errorMessage);
            return newState;

        case actions.LOGOUT_USER:
            newState.username = "Guest...Login";
            newState.email = "";
            newState.token = "";
            newState.loggedIn = false;
            // console.log("new LOGOUT_USER state.username: ", newState.username);
            return newState;

        case actions.SAVES_CAMPGROUNDS:
            newState.campGrounds = action.campGrounds;
            return newState;
        default:
            return state;
    }
} 