import axios from "axios";
import { login, loginError, toggleRegisterModal, toggleLoginModal } from '../redux/actionCreator';


/** 
* this is object with registration data
* @typedef {object} data
* @property {string} [name] - 8+ digit user name regex alpha-numeric, only required on register
* @property {string} email - email format string
* @property {string} password - minimum 8 digit password regex alpha-numeric
* 
*/

export default {
    /**
     * Called from LoginModal component then App.js handleLogin 
     * @function handleLogin
     * @param {data} data
     */
    loginAPI: function (data, dispatch) {
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
                dispatch(login({
                    token: response.data.token,
                    email: response.data.user.email,
                    username: response.data.user.name,
                    loggedIn: "true"
                }));
                dispatch(toggleLoginModal());
            })
            .catch(error => {
                console.log("Error, could not login from App.js: ", error);
                dispatch(loginError(error));
                // this.props.dispatch(loginError(error.response.data.statusMessage));
                dispatch(toggleLoginModal());

            });
    },

    /**
     * called from RegisterModal component to handle registration and then login request attribute changes
     * @function handleRegister
     * @param {data} data 
     * */
    registerAPI: function (data, dispatch) {
        // first register, then login
        axios
            .post(
                '/api/users/register',        // first register
                {
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            .then(response => {
                console.log(`register user: ${response.data.name} ${response.data.date}`);
                axios
                    .post(
                        '/api/users/login',       // then login
                        {
                            email: data.email,
                            password: data.password
                        })
                    .then(response => {
                        console.log(`login user: ${response.data.user.name}`);
                        dispatch(login({
                            token: response.data.token,
                            email: response.data.user.email,
                            username: response.data.user.name,
                            loggedIn: "true"
                        }));
                        // this.props.dispatch(toggleLoginModal());
                    }).catch(error => {
                        console.log("Could not login after register")
                        dispatch(loginError(error.response.data.statusMessage));
                    });
            })
            .catch(error => {
                console.log(" Could not register from App.js: " + error.message);
            })
            .finally(() => {
                dispatch(toggleRegisterModal());
            })
            ;
    }


}


