import React from 'react';
import { Container, Row, Input } from "reactstrap";
import SingleBook from './SingleBook';
import Book from '../Books/scifi.json';


class FilterBookList extends React.Component {
    state = {
        searchString: ""
    }
    searchChange = (e) => {
        this.setState({
            searchString: e.target.value
        });
    }
    render() {
        let bookList = Book.filter((book) => {
            return book.title.toLowerCase().indexOf(this.state.searchString.toLowerCase()) >= 0;
        }).map(B => {
            return (<SingleBook history={this.props.history} colWidth="col-4" book={B} />)
        });
        return (
            <Container className="mt-2">
                <Row>
                    <Input type="text" placeholder="Search book" onChange={this.searchChange} value={this.state.searchString} />
                </Row>
                <Row className="mt-4">
                    {bookList}
                </Row>
            </Container>
        );
    }
}

export default FilterBookList;
