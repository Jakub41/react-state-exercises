import React, {Component} from "react";
import {Row, Input, Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import Loading from "../Loading";
import CommentApi from "../../Apis/CommentApi";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      btnLabel: " Edit ",
      btnLabelDelete: "Delete",
      rate: this.props.data.rate,
      comment: this.props.data.comment,
      author: this.props.data.author,
      disabled: true,
      submitDisable: false,
      loading: false,
      modal: false,
    };
  }

  onUpdate = async () => {
    const {edit, comment, rate} = this.state;
    if (!edit) {
      this.setState({
        edit: true,
        btnLabel: "Update",
        disabled: false,
        submitDisable: true,
        btnLabelDelete: "Cancel",
      });
    } else {
      if (comment === "") {
        return;
      }

      this.setState({loading: true});
      try {
        const commentApi = new CommentApi();
        const body = {
          comment,
          rate,
          elementId: this.props.data.asin,
        };
        const data = await commentApi.updateComment(this.props.data._id, body);
        if (!data.success) {
          this.props.onShowErrorMessage();
        } else {
          this.setState({
            edit: false,
            btnLabel: " Edit ",
            btnLabelDelete: "Delete",
            disabled: true,
            loading: false,
          });
          this.props.onFetch();
        }
      } catch (err) {
        console.log("onUpdate err: ", err);
        this.props.onShowErrorMessage();
      } finally {
      }
    }
  };

  onDelete = async () => {
    const {btnLabelDelete} = this.state;
    if (btnLabelDelete === "Delete") {
      this.onShowModal();
    } else {
      this.setState({
        btnLabelDelete: "Delete",
        btnLabel: " Edit ",
        edit: false,
        submitDisable: false,
        disabled: true,
        comment: this.props.data.comment,
        rate: this.props.data.rate,
      });
    }
  };

  onChange = e => {
    const validate =
      e.target.name === "rate"
        ? e.target.value === this.props.data.rate &&
          this.state.comment === this.props.data.comment
        : e.target.value === this.props.data.comment &&
          this.state.rate === this.props.data.rate;

    this.setState({
      [e.target.name]: e.target.value,
      submitDisable: e.target.value === "" || validate,
    });
  };

  onDeleteComment = async () => {
    this.setState({loading: true, modal: false});
    try {
      const commentApi = new CommentApi();
      const data = await commentApi.deleteComment(this.props.data._id);
      if (!data.success) {
        this.props.onShowErrorMessage();
      } else {
        this.setState({loading: false});
        this.props.onFetch();
      }
    } catch (err) {
      console.log("onUpdate err: ", err);
      this.props.onShowErrorMessage();
    } finally {
    }
  };

  onShowModal = () => {
    this.setState(prevState => {
      return {modal: !prevState.modal};
    });
  };

  render() {
    const {data} = this.props;
    if (!data) {
      return null;
    }
    const {
      comment,
      rate,
      author,
      btnLabel,
      disabled,
      btnLabelDelete,
      loading,
      submitDisable,
      modal,
    } = this.state;

    return (
      <Row className="mt-2">
        {loading && <Loading />}
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <div style={{display: "flex", alignItems: "center", width: "100px"}}>
            <span style={{alignSelf: "center"}}>{author ? author : ""}</span>
          </div>
          <div style={{width: "200px", marginRight: "10px"}}>
            <Input
              type="select"
              name="rate"
              id="rate"
              value={rate}
              disabled={disabled}
              onChange={this.onChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </div>
          <Input
            name="comment"
            id="comment"
            value={comment}
            disabled={disabled}
            onChange={this.onChange}
          />
          <Button
            color="info"
            style={{marginLeft: "5px", marginRight: "5px", borderRadius: 0}}
            onClick={this.onUpdate}
            disabled={submitDisable}
          >
            {btnLabel}
          </Button>
          <Button color="danger" style={{borderRadius: 0}} onClick={this.onDelete}>
            {btnLabelDelete}
          </Button>
        </div>

        {/*Modal for asking to delete*/}
        <Modal isOpen={modal} toggle={this.onShowModal}>
          <ModalBody>Are you sure to delete this comment?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onDeleteComment}>
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.onShowModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
    );
  }
}
export default Comment;
