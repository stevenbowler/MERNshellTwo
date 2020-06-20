//@ts-check
/**@module */
import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { connect } from 'react-redux';

/**
 * if route/resource not found display this page
 * @function NoMatch
 */
function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    email: state.email,
    token: state.token,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(NoMatch);
// export default NoMatch;
