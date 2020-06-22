//@ts-check
/**@module*/
import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { List, ListItem, Link } from "../components/List";  // Note added Link to replace react-router-dom which currently has deprecation error
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import { connect } from 'react-redux';


class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    value: { something: 'something' }
  };
  // previousName = this.props.username;

  /**
   * Initial loadbooks and set previous state variable to track login username change
   * @function componentDidMount */
  componentDidMount() {
    this.loadBooks();
    this.previousName = this.props.username;
  }

  /**
   * If there was a login then reload books with the newly logged in users choices
   * @function componentDidUpdate */
  componentDidUpdate() {
    if (this.previousName !== this.props.username) {  // if login or logout update books displayed
      this.loadBooks();
      this.previousName = this.props.username;
    }
  }

  /**
   * This is where the magic happens ... the infamous / route
   * @function loadBooks */
  loadBooks = () => {
    // console.log("Books.js loadbooks this.props.username: ", this.props.username);
    API.getBooks({ username: this.props.username, token: this.props.token, email: this.props.email })
      .then(res => {
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      }
      )
      .catch(err => console.log(err));
  };

  /**
   * Delete a book from the list
   * @function deleteBook */
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  /**
   * handle changes in input field
   * @function handleInputChange */
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  /**
   * Onclick submit of new choice book/author etc.
   * @function handleFormSubmit */
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        username: this.props.username,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id} >
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    {/* <a href="/books/" + book._id>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a> */}
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
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

export default connect(mapStateToProps)(Books);
// export default Books;
