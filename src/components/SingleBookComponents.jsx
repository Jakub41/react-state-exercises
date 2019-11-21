import React, {Component} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  Button,
} from "reactstrap";
import Book from "../Books/scifi.json";

export default class SingleBookComponents extends Component {
  render() {
    let book = Book[0];
    console.log(book);
    return (
      <>
        <Container>
            <Row>
                <Col md="4">
                    
                </Col>
            </Row>
        </Container>
      </>
    );
  }
}
