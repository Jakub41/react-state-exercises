import React, {Component} from "react";
import {Col, Card, CardImg, CardTitle, CardBody, Button} from "reactstrap";

class SingleBook extends Component {
  onClickBook = () => {
    this.props.history.push({
      pathname: this.props.book.asin,
      state: {book: this.props.book},
    });
  };

  render() {
    const {book} = this.props;
    if (!book) {
      return null;
    }
    return (
      <Col className={this.props.colWidth} onClick={() => this.onClickBook()}>
        <Card>
          <CardImg className="images" object src={book.img} top width="100%" />
          <CardBody>
            <CardTitle>{book.title}</CardTitle>
            <div className="price-box">
              <div className="price">{book.price}€</div>
              <div>
                <Button color="danger">Buy now</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
export default SingleBook;
