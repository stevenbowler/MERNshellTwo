//@ts-check
/**@module 
 * @requires react
*/
import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import { toggleLoginModal } from '../../redux/actionCreator';
import API from '../../utils/userAPI';


const { passwordValidation, emailValidation, nameValidation } = require('../../utils/validationNameEmailPassword');


class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.email = {
            valid: false,
            invalid: false,
            invalidMessage: ""
        };
        this.password = {
            valid: false,
            invalid: false,
            invalidMessage: ""
        };
    }



    /**Receive event object w validated email and pswd, dispatch LOGIN_USER
     * @function handleSubmit
     * @param {*} event
     */
    handleSubmit = (event) => {
        // console.log("App.js handleSubmit logging in with: ", event.target.email.value);
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        if (this.email.valid && this.password.valid) {
            // console.log("handleSubmit Login with email: " + event.target.email.value + "password: " + event.target.password.value);
            API.loginAPI(data, this.props.dispatch);
            this.email.valid = false;
            this.password.valid = false;
            event.preventDefault();
        }
        else event.preventDefault();
    }


    /**Handle each character input in value attribut with name attribute, generic validation for name, email, password
     * @function handleInputChange
     * @param {*} event
     */
    handleInputChange = (event) => {
        const { name, value } = event.target;
        const test = {
            [name]: value
        };
        switch ([name].toString()) {
            case "name": var { error } = nameValidation(test); break;
            case "email": var { error } = emailValidation(test); break;
            case "password": var { error } = passwordValidation(test); break;
            default: break;
        }
        if (error) {
            this[name].valid = false;
            this[name].invalid = true;
            this[name].invalidMessage = error.details[0].message;
            this.forceUpdate();
            return;
        }
        if (event.target.value) {
            this[name].valid = true;
            this[name].invalid = false;
            this[name].invalidMessage = "";
            this.forceUpdate();
        }
    }

    /**Reset all validation variables, dispatch TOGGLE_REGISTERMODAL
     * @function handleCancel
     */
    handleCancel = () => {
        this.email.valid = false;
        this.email.invalid = false;
        this.password.valid = false;
        this.password.invalid = false;
        this.email.invalidMessage = "";
        this.password.invalidMessage = "";
        this.props.dispatch(toggleLoginModal());
    }

    render() {
        return (
            <div ref={this.wrapper}>
                <Modal isOpen={this.props.isOpenLoginModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} >
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="emailInput" sm={20}>Email (Login ID):</Label>
                                <Col sm={100}>
                                    <Input
                                        type="email"
                                        id="emailInput"
                                        defaultValue=""
                                        name="email"
                                        onChange={this.handleInputChange}
                                        placeholder="8 characters minumum"
                                        valid={this.email.valid ? true : false}
                                        invalid={this.email.invalid ? true : false} >
                                    </Input>
                                    <FormText>{this.email.invalidMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="passwordInput" sm={20}>Password: </Label>
                                <Col sm={100}>
                                    <Input
                                        type="password"
                                        id="passwordInput"
                                        defaultValue=""
                                        name="password"
                                        onChange={this.handleInputChange}
                                        placeholder="8 characters minumum"
                                        valid={this.password.valid ? true : false}
                                        invalid={this.password.invalid ? true : false} />
                                    <FormText>{this.password.invalidMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <Button color="primary" type="submit" >Login</Button>{' '}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email,
        loggedIn: state.loggedIn,
        isOpenLoginModal: state.isOpenLoginModal
    }
}

export default connect(mapStateToProps)(LoginModal);