//@ts-check
/**@module 
 * @requires react
 * @requires react-router-dom
 * @requires module:client/src/pages/Books
 * @requires module:client/src/pages/Detail
 * @requires module:client/src/pages/NoMatch
 * @requires bootstrap
 * @requires axios
 * @requires module:client/src/components/AppNavbar
 * @requires module:client/src/components/LoginRegisterModals
 * @requires module:client/src/components/ExtraModal
 * @requires react-redux
 * @requires redux
 * @requires redux-devtools-extension
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
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import ExtraModal from './components/ExtraModal';
import { connect } from 'react-redux';
import { login, loginError, toggleRegisterModal, toggleLoginModal } from './redux/actionCreator';
import userAPI from './utils/userAPI';



// set background color below navbar
//@ts-ignore
document.body.style = 'background: black;';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      isOpenNavBar: false,
      isOpenLoginModal: false,
      isOpenRegisterModal: false,
      isOpenExtraModal: false
    };

  }


  // LIFECYCLE METHODS and related support functions

  /**
   * @function componentDidMount
   */
  componentDidMount() {
    // if opening session for the very first time then set username "Guest...Login", otherwise, leave as is
    if (!sessionStorage["name"]) {
      console.log("app.js componentDidMount: ", this.state.name);
      sessionStorage.setItem("name", "Guest...Login");
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("email", "");
      sessionStorage.setItem("loggedIn", "false");
    } else console.log("sessionStorage.name already exists");

  }

  // getSnapshotBeforeUpdate(prevprops, prevstate) {}



  /**
   * this is object with registration data
   * @typedef {object} data
   * @property {string} name - 8+ digit user name regex alpha-numeric
   * @property {string} email - email format string
   * @property {string} password - minimum 8 digit password regex alpha-numeric
   * 
  */


  /**
   * called from RegisterModal component to handle registration and then login request attribute changes
   * @function handleRegister
   * @param {data} data 
   * */
  handleRegister = (data) => {
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
            this.props.dispatch(login({
              token: response.data.token,
              email: response.data.user.email,
              username: response.data.user.name,
              loggedIn: true
            }));
            // this.props.dispatch(toggleLoginModal());
          }).catch(error => {
            console.log("Could not login after register")
            this.props.dispatch(loginError(error.response.data.statusMessage));
          });
      })
      .catch(error => {
        console.log(" Could not register from App.js: " + error.message);
      })
      .finally(() => {
        this.props.dispatch(toggleRegisterModal());
      })
      ;
  }


  /**
   * Called from LoginModal component
   * @function handleLogin
   * @param {data} data
   */
  handleLogin = (data) => userAPI.Login(data);
  // handleLogin = (data) => {
  //   axios
  //     .post(
  //       '/api/users/login',
  //       {
  //         email: data.email,
  //         password: data.password
  //       })
  //     .then(response => {
  //       console.log(`login user: ${response.data.user.name}`);
  //       this.props.dispatch(login({
  //         token: response.data.token,
  //         email: response.data.user.email,
  //         username: response.data.user.name,
  //         loggedIn: true
  //       }));
  //       this.props.dispatch(toggleLoginModal());
  //     })
  //     .catch(error => {
  //       console.log("Error, could not login from App.js: ", error.response.data.statusMessage);
  //       this.props.dispatch(loginError(error.response.data.statusMessage));
  //       this.props.dispatch(toggleLoginModal());
  //     });
  // }


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
        <div ref={this.wrapper}>
          <AppNavbar
            onTutorial={this.handleTutorial}
            onChangeColor={this.handleChangeColor}
          />
          <LoginModal
            onLogin={this.handleLogin}
          />
          <RegisterModal
            onRegister={this.handleRegister}
          />
          <ExtraModal
          />
          <Switch>
            <Route exact path="/" render={(props) => <Books {...props} />} />
            <Route exact path="/books" render={(props) => <Books {...props} />} />
            <Route exact path="/books/:id" render={(props) => <Detail {...props} />} />
            <Route render={(props) => <NoMatch {...props} />} />
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

