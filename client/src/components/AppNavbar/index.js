//@ts-check
/**@module 
 * @requires react
 * @requires reactstrap
*/
import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavbarText,
    Nav,
    NavItem,
    NavLink,
    // Container,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';




class AppNavbar extends Component {
    /**
     * Toggle the navbar modal variable
     * @function toggleModal */
    toggleModal = () => this.modal = !this.modal;

    /** 
     * Unused
     */
    registerInput = () => this.toggleModal();

    /**
     * Send back toggle signal to App.js, to open/close navbar
     * @function toggle
     */
    toggle = () => this.props.onToggle();

    /**
     * Onclick request to register
     * @function register
     */
    register = () => this.props.onRegister();

    /**
     * Onclick request to login
     * @function login
     */
    login = () => this.props.onLogin();

    /**
     * Onclick request to logout
     * @function logout
     */
    logout = () => this.props.onLogout();

    /**
     * Onclick toggle leaderboard
     * @function leaderBoard
     */
    leaderBoard = () => this.props.onLeaderBoard();

    /**
     * Onclick request tutorial video
     * @function tutorial
     */
    tutorial = () => this.props.onTutorial();

    /**
     * Onclick request to change background color
     * @function changeColor
     */
    changeColor = () => this.props.onChangeColor();

    render() {
        return (
            // <div> //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
            <Navbar color="dark" expand="sm" className="mb-5 sticky-top">
                {/* <Container> */}
                <NavbarBrand href="/">MERNshellTwo</NavbarBrand>
                <NavbarText className="text-warning" placeholder="test">{this.props.username}</ NavbarText>
                <NavbarToggler color="dark" border="dark" onClick={this.toggle}><img src='hamburger.jpg' alt='Menu' style={{
                    height: "40px",
                    width: "40px"
                }}></img></NavbarToggler>
                <Collapse isOpen={this.props.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <Button color="dark" hidden={this.props.loggedIn ? true : false} float="left" display="inline" onClick={this.register}>Register</Button>
                        <Button color="dark" hidden={this.props.loggedIn ? true : false} float="left" display="inline" onClick={this.login}>Login</Button>
                        <Button color="dark" hidden={this.props.loggedIn ? false : true} float="left" display="inline" onClick={this.logout}>Logout</Button>
                        <Button color="dark" hidden={this.props.loggedIn ? false : true} float="left" display="inline" onClick={this.leaderBoard}>Modal</Button>
                        <Button color="dark" hidden={this.props.loggedIn ? true : false} float="left" display="inline" onClick={this.tutorial}>Tutorial</Button>
                        {/* <Button float="left" display="inline" onClick={this.unused}>Unused</Button> */}
                        <Button float="left" color="dark" display="inline" onClick={this.changeColor}>Color</Button>
                        <NavItem>
                            <NavLink display="inline" color="white" href="https://github.com/stevenbowler/MERNshellTwo">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                {/* </Container> */}

            </Navbar>

            // </div >  //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
        );
    }

}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(AppNavbar);
// export default AppNavbar;