import * as actions from './actions';
import { cloneDeep } from 'lodash';

const initialState = {
    username: sessionStorage.getItem("name"),
    email: sessionStorage.getItem("email"),
    token: sessionStorage.getItem("token"),
    loggedIn: sessionStorage.getItem("loggedIn"),
    isOpenNavbar: false,
    isOpenExtraModal: false,
    isOpenLoginModal: false,
    isOpenRegisterModal: false
}


export const todoReducer = (state = initialState, action) => {
    const newState = cloneDeep(state);
    switch (action.type) {

        case actions.LOGIN_USER:
            newState.username = action.user.username;
            newState.email = action.user.email;
            newState.token = action.user.token;
            newState.loggedIn = "true";
            sessionStorage.setItem("token", newState.token);
            sessionStorage.setItem("email", newState.email);
            sessionStorage.setItem("name", newState.username);
            sessionStorage.setItem("loggedIn", newState.loggedIn);
            newState.errorMessage = null;
            console.log("new state.username: ", newState.username);
            return newState;

        case actions.REGISTER_USER:
            newState.username = "Registered...OK";
            newState.email = "";
            // newState.token = action.token;
            newState.loggedIn = "true";
            console.log("new state.username: ", newState.username);
            return newState;

        case actions.LOGIN_ERROR:
            newState.username = "wrong email or pswd";
            newState.email = "";
            newState.token = "";
            newState.loggedIn = "false";
            newState.errorMessage = action.message;
            console.log("new LOGOUT_USER newstate.errorMessage: ", newState.errorMessage);
            return newState;

        case actions.LOGOUT_USER:
            console.log("LOGOUT_USER state.username: ", state.username);
            newState.username = "Guest...Login";
            newState.email = "";
            newState.token = "";
            newState.loggedIn = "false";
            sessionStorage.setItem("name", newState.username);
            sessionStorage.setItem("email", newState.email);
            sessionStorage.setItem("token", newState.token);
            sessionStorage.setItem("loggedIn", "false");
            return newState;

        case actions.TOGGLE_NAVBAR:
            newState.isOpenNavbar = !state.isOpenNavbar;
            console.log("new TOGGLE_NAVBAR state.isOpenNavbar: ", newState.isOpenNavbar);
            return newState;

        case actions.TOGGLE_EXTRAMODAL:
            newState.isOpenExtraModal = !state.isOpenExtraModal;
            console.log("new TOGGLE_EXTRAMODAL state.isOpenExtraModal: ", newState.isOpenExtraModal);
            return newState;

        case actions.TOGGLE_LOGINMODAL:
            newState.isOpenLoginModal = !state.isOpenLoginModal;
            console.log("new TOGGLE_EXTRAMODAL state.isOpenLoginModal: ", newState.isOpenLoginModal);
            return newState;

        case actions.TOGGLE_REGISTERMODAL:
            newState.isOpenRegisterModal = !state.isOpenRegisterModal;
            console.log("new TOGGLE_EXTRAMODAL state.isOpenRegisterModal: ", newState.isOpenRegisterModal);
            return newState;

        case actions.SAVES_CAMPGROUNDS:
            newState.campGrounds = action.campGrounds;
            return newState;
        default:
            return state;
    }
} 