import axios from "axios";
import { connect } from 'react-redux';

import { login, loginError, toggleRegisterModal, toggleLoginModal } from '../redux/actionCreator';



/**
 * Called from LoginModal component
 * @function handleLogin
 * @param {data} data
 */
export const Login = (data) => {
    console.log("userAPI.Login(data): ", data);
    axios
        .post(
            '/api/users/login',
            {
                email: data.email,
                password: data.password
            })
        .then(response => {
            console.log(`login user: ${response.data.user.name}`);
            this.props.dispatch(login({
                token: response.data.token,
                email: response.data.user.email,
                username: response.data.user.name,
                loggedIn: true
            }));
            this.props.dispatch(toggleLoginModal());
        })
        .catch(error => {
            console.log("Error, could not login from App.js: ", error);
            this.props.dispatch(loginError(error));
            // this.props.dispatch(loginError(error.response.data.statusMessage));
            this.props.dispatch(toggleLoginModal());
        });
}



const mapDispatchToProps = dispatch => {
    return {
        dispatch,

        login,
        loginError,
        toggleLoginModal,
        toggleRegisterModal
    }
}

// export { Login: connect(null, mapDispatchToProps)(Login) };

export default connect(null, mapDispatchToProps)(Login);

// };
