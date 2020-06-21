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
import {
    toggleNavbar,
    toggleExtraModal,
    logout,
    toggleLoginModal,
    toggleRegisterModal
} from '../../redux/actionCreator';




class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();  //  todo requires ref={this.wrapper} in navbar div to eliminate deprecation warning
    }

    /**
     * Onclick Toggle Navbar with redux call
     * @function toggle
     */
    toggleNavbar = () => this.props.dispatch(toggleNavbar());


    /**
     * Onclick toggle ExtraModal with redux toggle
     * @function leaderBoard
     */
    extraModal = () => this.props.dispatch(toggleExtraModal());


    /**
     * Onclick request to register
     * @function register
     */
    register = () => this.props.dispatch(toggleRegisterModal());

    /**
     * Onclick request to login
     * @function login
     */
    login = () => this.props.dispatch(toggleLoginModal());

    /**
     * Onclick request to logout
     * @function logout
     */
    logout = () => this.props.dispatch(logout());


    /**
     * handle the Changecolor event from Navbar
     * @function changeColor
     */
    changeColor = () => {
        console.log("changeColor");
        var randomRed = Math.floor(Math.random() * 255);
        var randomGreen = Math.floor(Math.random() * 255);
        var randomBlue = Math.floor(Math.random() * 255);
        console.log(randomGreen);
        //@ts-ignore
        document.body.style = `background-color: rgb(${randomRed}, ${randomGreen}, ${randomBlue});`;
    }


    /**
     * handle the Tutorial button event, play the tutorial for this app
     * @function tutorial
     */
    tutorial = () => {
        console.log("handleTutorial");
        window.location.href = "https://drive.google.com/file/d/1dXeXGydfJTvsE2GS7LnczJzTW0EKO-wS/view?usp=sharing";
    }




    render() {
        return (
            // <div> //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
            <Navbar color="dark" expand="sm" className="mb-5 sticky-top">
                <NavbarBrand href="/">MERNshellTwo</NavbarBrand>
                <NavbarText className="text-warning" placeholder="test">{this.props.username}</ NavbarText>
                <NavbarToggler color="dark" border="dark" onClick={this.toggleNavbar}><img src='/hamburger.jpg' alt='Menu' style={{
                    height: "40px",
                    width: "40px"
                }}></img></NavbarToggler>
                <Collapse isOpen={this.props.isOpenNavbar} navbar>
                    <Nav className="ml-auto" navbar>
                        <Button color="dark" hidden={this.props.loggedIn === "true" ? true : false} float="left" display="inline" onClick={this.register}>Register</Button>
                        <Button color="dark" hidden={this.props.loggedIn === "true" ? true : false} float="left" display="inline" onClick={this.login}>Login</Button>
                        <Button color="dark" hidden={this.props.loggedIn === "true" ? false : true} float="left" display="inline" onClick={this.logout}>Logout</Button>
                        <Button color="dark" hidden={this.props.loggedIn === "true" ? false : true} float="left" display="inline" onClick={this.extraModal}>Modal</Button>
                        <Button color="dark" hidden={this.props.loggedIn === "true" ? true : false} float="left" display="inline" onClick={this.tutorial}>Tutorial</Button>
                        {/* <Button float="left" display="inline" onClick={this.unused}>Unused</Button> */}
                        <Button float="left" color="dark" display="inline" onClick={this.changeColor}>Color</Button>
                        <NavItem>
                            <NavLink display="inline" color="white" href="https://github.com/stevenbowler/MERNshellTwo">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            // </div >  //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
        );
    }

}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email,
        loggedIn: state.loggedIn,
        isOpenNavbar: state.isOpenNavbar
    }
}

export default connect(mapStateToProps)(AppNavbar);
// export default AppNavbar;