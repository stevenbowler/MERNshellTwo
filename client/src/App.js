//@ts-check
/**@module 
 * @requires react
 * @requires react-router-dom
 * @requires module:/src/pages/Books
 * @requires module:/src/pages/Detail
 * @requires module:/src/pages/NoMatch
 * @requires bootstrap
 * @requires axios
 * @requires module:/src/components/AppNavbar
 * @requires module:/src/components/LoginRegisterModals
 * @requires module:/src/components/ExtraModal
*/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";  // was in original Week 20 Activity 11

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
//import { Container } from 'reactstrap';   // was used in origial MERNshell
import AppNavbar from './components/AppNavbar';
import LoginRegisterModals from './components/LoginRegisterModals';
import Modal from './components/ExtraModal';
import { connect } from 'react-redux';
import { login, logout, loginError } from './redux/actionCreator';





// set background color below navbar
//@ts-ignore
document.body.style = 'background: black;';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.loggedIn = false;
    this.token = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.timerOn = false;
    this.state = {
      isOpenNavBar: false,
      isOpenLoginModal: false,
      isOpenRegisterModal: false,
      isOpenLeaderBoardModal: false,
      name: "Guest...Login",
      loggedIn: false
    };
  }


  // LIFECYCLE METHODS and related support functions

  componentDidMount() {
    if (sessionStorage["name"]) {
      console.log("app.js componentDidMount: ", this.state.name);
      this.setState({ name: sessionStorage.getItem("name") });
      this.setState({ token: sessionStorage.getItem("token") });
      this.setState({ email: sessionStorage.getItem("email") });
      this.setState({ loggedIn: (sessionStorage.getItem("loggedIn") === "true") ? true : false });
    } else console.log("sessionStorage.name doesn't exist");

  }


  // STATE HANDLERS and related support functions FROM COMPONENTS

  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleNavbar
   */
  handleToggleNavbar = () => {
    this.setState({ isOpenNavBar: !this.state.isOpenNavBar });
    if (this.state.isOpenNavBar) this.setState({ gameOn: false });
  }


  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleLeaderBoardModal
   */
  handleToggleLeaderBoardModal = () => {
    this.setState({ isOpenRegisterModal: false });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: !this.state.isOpenLeaderBoardModal });
  }



  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar
   * @function handleToggleLoginRegisterModal
   */
  handleToggleLoginRegisterModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: false });
  }


  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleLoginModal
  */
  handleToggleLoginModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLeaderBoardModal: false });
    this.setState({ isOpenLoginModal: !this.state.isOpenLoginModal });
  }

  /**
   * this is object with registration data
   * @typedef {object} data
   * @property {string} name - 8+ digit user name regex alpha-numeric
   * @property {string} email - email format string
   * @property {string} password - minimum 8 digit password regex alpha-numeric
   * 
  */

  /**
   * called from LoginRegisterModals component to handle registration request attribute changes
   * @function handleRegister
   * @param {data} data 
   * */
  handleRegister = (data) => {
    // console.log("App.js handleRegister input name: " + data.name + "email: " + data.email + "password: " + data.password);
    var finishRegister = () => {
      this.handleToggleLoginRegisterModal();
    }
    axios
      .post(
        '/api/users/register',
        {
          name: data.name,
          email: data.email,
          password: data.password
        })
      .then(function (response) {
        console.log(`register user: ${response.data.name} ${response.data.date}`);
        //this.handleLogin(loginData);    // TODO should be able to login automatically once registered OK
      })
      .catch(function (error) {
        console.log(" Could not register from App.js: " + error.message);
      })
      //@ts-ignore
      .finally(function () {
        finishRegister();
      })
      ;
  }


  /**
   * @function handleLogin
   * @param {data} data
   */
  handleLogin = (data) => {
    var tokenHandleLogin = "";
    var nameHandleLogin = "";
    var emailHandleLogin = "";
    var loginResponseError = "";
    const finishLogin = () => {
      if (loginResponseError) {
        // console.log("loginResponseError: ", loginResponseError);
        this.props.dispatch(loginError(loginResponseError));
        this.handleToggleLoginModal();
        return;
      }
      // console.log("handleLogin this.token = tokenHandleLogin" + this.token);
      sessionStorage.setItem("token", tokenHandleLogin);
      sessionStorage.setItem("email", emailHandleLogin);
      sessionStorage.setItem("name", nameHandleLogin);
      sessionStorage.setItem("loggedIn", "true");

      var reduxPayload = {
        token: tokenHandleLogin,
        email: emailHandleLogin,
        username: nameHandleLogin,
        loggedIn: true
      }
      this.props.dispatch(login(reduxPayload));
      this.handleToggleLoginModal();
    }
    axios
      .post(
        '/api/users/login',
        {
          email: data.email,
          password: data.password
        })
      .then(function (response) {
        console.log(`login user: ${response.data.user.name}`);
        tokenHandleLogin = response.data.token;
        nameHandleLogin = response.data.user.name;
        emailHandleLogin = response.data.user.email;
        // console.log("app.js handleLogin tokenHandleLogin: " + tokenHandleLogin);

        // sessionStorage.setItem("token", tokenHandleLogin);
        // sessionStorage.setItem("email", emailHandleLogin);
        // sessionStorage.setItem("name", nameHandleLogin);
        // sessionStorage.setItem("loggedIn", "true");

        // var reduxPayload = {
        //   token: tokenHandleLogin,
        //   email: emailHandleLogin,
        //   username: nameHandleLogin,
        //   loggedIn: true
        // }
        // this.props.dispatch(login(reduxPayload));
        // this.handleToggleLoginModal();

      })
      .catch(function (error) {
        //console.log("Steve Output, could not login from App.js: " + error);
        loginResponseError = error;
        console.log("Error, could not login from App.js: ", loginResponseError);
        // this.props.dispatch(loginError(loginResponseError));
        // this.handleToggleLoginModal();
      })
      //@ts-ignore
      .finally(function () {
        finishLogin();
      });
  }

  /**
   * handle the logout event
   * @function handleLogout
   */
  handleLogout = () => {
    console.log(`logout: ${this.props.name}`);
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("loggedIn", "false");
    this.props.dispatch(logout());
  }


  /**
   * handle the Changecolor event from Navbar
   * @function handleChangeColor
   */
  handleChangeColor = () => {
    console.log("changeColor");
    var randomRed = Math.floor(Math.random() * 255);
    var randomGreen = Math.floor(Math.random() * 255);
    var randomBlue = Math.floor(Math.random() * 255);
    console.log(randomGreen);
    //@ts-ignore
    document.body.style = `background-color: rgb(${randomRed}, ${randomGreen}, ${randomBlue});`;
    this.setState({ backgroundColor: `rgb(${randomRed}, ${randomGreen}, ${randomBlue})` });
  }

  /**
   * handle the Tutorial button event, play the tutorial for this app
   * @function handleTutorial
   */
  handleTutorial = () => {
    console.log("handleTutorial");
    window.location.href = "https://drive.google.com/file/d/1dXeXGydfJTvsE2GS7LnczJzTW0EKO-wS/view?usp=sharing";
  }


  render() {
    return (
      <Router>
        <div>
          <AppNavbar
            isOpen={this.state.isOpenNavBar}
            onRegister={this.handleToggleLoginRegisterModal}
            onLogin={this.handleToggleLoginModal}
            onLogout={this.handleLogout}
            onLeaderBoard={this.handleToggleLeaderBoardModal}
            onToggle={this.handleToggleNavbar}
            onTutorial={this.handleTutorial}
            onChangeColor={this.handleChangeColor}
          />
          <LoginRegisterModals
            isOpenLoginModal={this.state.isOpenLoginModal}
            isOpenRegisterModal={this.state.isOpenRegisterModal}
            onCancel={this.handleToggleLoginRegisterModal}
            onRegister={this.handleRegister}
            onLogin={this.handleLogin}
          />
          <Modal
            onLogout={this.handleLogout}
            isOpenLeaderBoardModal={this.state.isOpenLeaderBoardModal}
            onCancel={this.handleToggleLeaderBoardModal}
          />
          <Switch>
            <Route exact path="/" render={(props) => <Books {...props} />} />
            <Route exact path="/books" render={(props) => <Books {...props} />} />
            <Route exact path="/books/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    email: state.email,
    token: state.token,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);

