import React, {Component} from "react";
import {Button, Badge} from "reactstrap";

class MyBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "This is Our Badge",
      color: "success",
    };
  }
  render() {
    return (
      <div>
        <Button color="primary" outline>
          <Badge color={this.state.color}>{this.state.titleText}</Badge>
        </Button>
      </div>
    );
  }
}

export default MyBadge;
