//@ts-check
/**@module 
 * @requires react
 * @requires reactstrap
 * @requires react-redux
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
import { toggleRegisterModal } from '../../redux/actionCreator';
import API from '../../utils/userAPI';



const { passwordValidation, emailValidation, nameValidation } = require('../../utils/validationNameEmailPassword');


class RegisterModal extends Component {
    constructor(props) {
        super(props);

        this.wrapper = React.createRef();
        this.name = {
            valid: false,
            invalid: false,
            invalidMessage: ""
        };
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




    /**
     * @function handleSubmit
     * @param {*} event
     */
    handleSubmit = (event) => {
        // console.log("App.js handleSubmit logging in with: ", event.target.email.value);
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        // console.log("this.email.valid:", this.email.valid);
        if (this.name.valid && this.email.valid && this.password.valid) {
            API.registerAPI(data, this.props.dispatch);
            this.name.valid = false;
            this.email.valid = false;
            this.password.valid = false;
            event.preventDefault();
        }
        else {
            console.log("did not pass validation");
            event.preventDefault();
        }
    }


    /**Handle each character input in name field, generic validation for name, email, password
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
        this.name.valid = false;
        this.name.invalid = false;
        this.password.valid = false;
        this.password.invalid = false;
        this.email.invalidMessage = "";
        this.name.invalidMessage = "";
        this.password.invalidMessage = "";
        this.props.dispatch(toggleRegisterModal());
    }

    render() {
        return (
            <div ref={this.wrapper}>
                <Modal isOpen={this.props.isOpenRegisterModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}  >
                    <ModalHeader>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup >
                                <Label for="nameInput" sm={20}>Name:</Label>
                                <Col sm={100}>
                                    <Input
                                        type="search"
                                        id="nameInput"
                                        defaultValue=""
                                        name="name"
                                        onChange={this.handleInputChange}
                                        placeholder="8 characters minumum"
                                        valid={this.name.valid ? true : false}
                                        invalid={this.name.invalid ? true : false}>
                                    </Input>
                                    <FormText>{this.name.invalidMessage}</FormText>
                                </Col>
                            </FormGroup>
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
                                        {/* valid={this.validEmail ? true : false}
                                        invalid={this.invalidEmail ? true : false} > */}
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
                            <Button color="primary" type="submit" >Register</Button>{' '}
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
        isOpenRegisterModal: state.isOpenRegisterModal
    }
}

export default connect(mapStateToProps)(RegisterModal);