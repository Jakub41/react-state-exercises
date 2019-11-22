import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import CommentList from "../../Components/Comment/CommentList";
import Loading from "../../Components/Loading";
import Error from "../../Components/Alert/Error";
import CommentApi from "../../Apis/CommentApi";

class DetailBook extends React.Component {
  state = {
    comments: [],
    comment: "",
    rate: 1,
    disabled: true,
    hasErrors: false,
    loading: false,
    message: "There is an issue to fetch data from server. Please try again later.",
  };

  componentDidMount() {
    this.onFetchComments();
  }

  onFetchComments = async () => {
    this.setState({loading: true});
    try {
      const commentApi = new CommentApi();
      const data = await commentApi.getAllComments(this.props.match.params.asin);
      if (!data.success) {
        this.onShowErrorMessage();
      } else {
        this.setState({
          comments: data.data,
          loading: false,
        });
      }
    } catch (err) {
      console.log("onFetchComments err: ", err);
      this.onShowErrorMessage();
    } finally {
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: e.target.value === "",
    });
  };

  onSubmit = async () => {
    const {comment, rate} = this.state;
    if (comment === "") {
      return;
    }

    this.setState({loading: true});
    try {
      const commentApi = new CommentApi();
      const body = {
        comment,
        rate,
        elementId: this.props.match.params.asin,
      };
      const data = await commentApi.addComment(body);
      if (!data.success) {
        this.onShowErrorMessage();
      } else {
        this.setState({
          comment: "",
          disabled: true,
          loading: false,
        });
        this.onFetchComments();
      }
    } catch (err) {
      console.log("onSubmit err: ", err);
      this.onShowErrorMessage();
    } finally {
    }
  };

  onShowErrorMessage = () => {
    this.setState({hasErrors: true, loading: false});
    setTimeout(this.onClearMessage, 5000);
  };

  onClearMessage = () => {
    this.setState({hasErrors: false});
  };

  render() {
    const {book} = this.props.history.location.state;
    const {comments, comment, rate, disabled, loading, hasErrors, message} = this.state;
    if (!book) {
      return null;
    }
    return (
      <Container className="mt-2 mb-4">
        {hasErrors && <Error message={message} />}
        {loading && <Loading />}
        <Row>
          <Col className="col-3"></Col>
          <Col className="col-6 mt-3">
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
          <Col className="col-3"></Col>
        </Row>
        <Row className="mt-2">
          <div className="col-12 mt-3">
            <FormGroup className="col-3 mt-3">
              <Label for="rate">Rate</Label>
              <Input
                type="select"
                name="rate"
                id="rate"
                value={rate}
                onChange={this.onChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup className="col-6 mt-3">
              <Label for="comment">Comment</Label>
              <Input
                id="comment"
                type="text"
                name="comment"
                placeholder="Type comment"
                onChange={this.onChange}
                value={comment}
              />
            </FormGroup>
            <FormGroup className="col-6 mt-3">
              <Button color="primary" disabled={disabled} onClick={this.onSubmit}>
                Comment
              </Button>
            </FormGroup>
          </div>
        </Row>
        <CommentList
          comments={comments}
          onFetch={this.onFetchComments}
          onShowErrorMessage={this.onShowErrorMessage}
        />
      </Container>
    );
  }
}

export default DetailBook;
