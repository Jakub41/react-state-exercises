import React, { Component } from 'react'
import { Col, Card, CardImg, CardTitle, CardBody, CardSubtitle, Button } from "reactstrap";
import Book from '../Books/scifi.json';

export default class SingleBookComponents extends Component {
    render() {
        let book = Book[0];
        console.log(book)
        return (
            <div>
                
            </div>
        )
    }
}
