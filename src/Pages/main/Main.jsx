import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import SingleBook from "../../Components/SingleBook";
import FilterBookList from "../../Components/FilterBookList";
import Book from "../../Books/scifi.json";

class Main extends Component {
  state = {book: this.randomBook()};

  componentDidMount() {
    setInterval(() => {
      this.setState({
        book: this.randomBook(),
      });
    }, 3000);
  }

  randomBook() {
    const random = Math.floor(Math.random() * Book.length);
    return Book[random];
  }
  render() {
    return (
      <Container>
        {/*<WarningSign text="peligro"></WarningSign>
                <div>
                    <MyBadge />
        </div>*/}

        <Row>
          <Col className="col-3"></Col>
          <SingleBook
            colWidth="col-6 mt-3"
            img={this.state.book.img}
            title={this.state.book.title}
            price={this.state.book.price}
          />
          <Col className="col-3"></Col>
        </Row>
        <FilterBookList history={this.props.history} />
      </Container>
    );
  }
}

export default Main;
