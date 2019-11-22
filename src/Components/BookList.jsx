import React, { Component } from 'react';
import {Row, Container} from 'reactstrap';

import Book from '../Books/scifi.json';
import SingleBook from './SingleBook.jsx';

class BookList extends Component {
    
    render() {
        
    let bookList = Book.map(B => {
            return(<SingleBook colWidth="col-6" img={B.img} title={B.title} price={B.price}/>)
        });
        return (
            <Container>
            <Row>
            {bookList}    
            </Row>
            </Container>
        );
    }
}

export default BookList;