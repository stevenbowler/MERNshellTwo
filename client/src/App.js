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

  // componentDidUpdate() {
  // }

  // componentWillUnmount() {
  // }



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
   * @function
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
    var loginError = "";
    const finishLogin = () => {
      if (loginError) {
        this.setState({ name: "wrong email or pswd" }); // will display error message on Navbar
        // console.log(this.name);
        this.handleToggleLoginModal();
        return;
      }
      this.token = tokenHandleLogin;
      sessionStorage.setItem("token", this.token);
      // console.log("handleLogin this.token = tokenHandleLogin" + this.token);
      this.email = data.email;
      sessionStorage.setItem("email", this.email);
      this.password = data.password;
      sessionStorage.setItem("name", nameHandleLogin);
      this.setState({ name: nameHandleLogin }); // will display name on Navbar
      this.handleToggleLoginModal();
      this.setState({ loggedIn: true });
      sessionStorage.setItem("loggedIn", "true");
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
        // console.log("app.js handleLogin tokenHandleLogin: " + tokenHandleLogin);
      })
      .catch(function (error) {
        //console.log("Steve Output, could not login from App.js: " + error);
        loginError = error;
        console.log("Error, could not login from App.js: ", loginError);
      })
      .finally(function () {
        finishLogin();
      });
  }

  /**
   * handle the logout event
   * @function handleLogout
   */
  handleLogout = () => {
    console.log(`logout: ${this.state.name}`);
    this.token = "";
    this.email = "";
    this.password = "";
    sessionStorage.setItem("token", this.token);
    sessionStorage.setItem("email", this.email);
    this.setState({ name: "Guest...Login" }, () => sessionStorage.setItem("name", this.state.name));
    this.setState({ loggedIn: false });
    sessionStorage.setItem("loggedIn", "false");   // TODO this may be needed:
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
            name={this.state.name}
            loggedIn={this.state.loggedIn}
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
            name={this.state.name}
            email={this.state.email}
          />
          <Modal
            loggedIn={this.state.loggedIn}
            onLogout={this.handleLogout}
            isOpenLeaderBoardModal={this.state.isOpenLeaderBoardModal}
            onCancel={this.handleToggleLeaderBoardModal}
            token={this.token}
            email={this.email}
            userName={this.state.name}
          />
          <Switch>
            <Route exact path="/" render={(props) => <Books {...props} username={this.state.name} token={this.state.token} email={this.state.email} />} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
