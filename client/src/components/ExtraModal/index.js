//@ts-check
/**@module */
import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    FormText,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';


class ExtraModal extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
    }

    componentDidUpdate() {
    }


    /**
     * Onclick Cancel button event, trigger onCancle and handleCancel in App.js
     * @function cancel
     */
    cancel = () => {
        this.props.onCancel(this.userBestScore);
    }

    /**
     * Called when invalid attempt, timed-out JWT, to access MongoDB
     * @function logout
     */
    logout = () => this.props.onLogout();

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpenLeaderBoardModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Generic Modal with Mongo Data</ModalHeader>
                    <ModalBody>
                        <Form >
                            <FormGroup>
                                <Label for="BestScore" sm={20}>Top 5 All Time Best Data:</Label>
                                <Col sm={100}>

                                    <FormText>
                                        <strong>{"1.  "}</strong>
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="yourBestScore" sm={20}>Your Best: </Label>
                                <Col sm={100}>

                                    <FormText>
                                        {"Name:  "}
                                        {"  Score:   "}
                                        {"  Level:   "}
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="yourScore" sm={20}>This Game: </Label>
                                <Col sm={100}>

                                    <FormText>
                                        {"  Your Score:  "}
                                        {"  Your Level:   "}
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }

}
export default ExtraModal;