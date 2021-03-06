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
import './App.css';
//import { Container } from 'reactstrap';   // was used in origial MERNshell
import AppNavbar from './components/AppNavbar';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import ExtraModal from './components/ExtraModal';
import { connect } from 'react-redux';
import { resetUser } from './redux/actionCreator';




// set background color below navbar
//@ts-ignore
document.body.style = 'background: black;';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }


  // LIFECYCLE METHODS and related support functions

  /**
   * @function componentDidMount
   */
  componentDidMount() {
    if (!sessionStorage["name"]) {
      this.props.dispatch(resetUser());    // on load, reset all user settings, only when not already set
    } else console.log("sessionStorage.name already exists");
  }

  // getSnapshotBeforeUpdate(prevprops, prevstate) {}


  render() {
    return (
      <Router>
        <div ref={this.wrapper}>
          <AppNavbar />
          <LoginModal />
          <RegisterModal />
          <ExtraModal />
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

