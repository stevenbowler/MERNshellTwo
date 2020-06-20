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
import { connect } from 'react-redux';
import { toggleExtraModal } from '../../redux/actionCreator';
// import axios from 'axios';


class ExtraModal extends Component {
    // constructor(props) {
    //     super(props);

    // }

    // componentDidMount() {
    // }

    // componentDidUpdate() {
    // }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpenExtraModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} toggle={this.toggleModal} >
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
                        <Button color="secondary" onClick={() => this.props.dispatch(toggleExtraModal())}>Cancel</Button>
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
        isOpenExtraModal: state.isOpenExtraModal
    }
}

export default connect(mapStateToProps)(ExtraModal);
// export default ExtraModal;