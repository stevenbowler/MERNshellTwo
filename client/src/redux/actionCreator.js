import * as actions from './actions';


export const login = (user) => {
    return {
        type: actions.LOGIN_USER,
        user
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT_USER
    }
}

export const register = (user) => {
    return {
        type: actions.REGISTER_USER,
        user
    }
}

export const loginError = (message) => {
    return {
        type: actions.LOGIN_ERROR,
        message
    }
}

export const savesCampGrounds = (campGrounds) => {
    return {
        type: actions.SAVES_CAMPGROUNDS,
        campGrounds
    }
}