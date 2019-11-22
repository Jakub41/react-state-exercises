import React from "react";
import {Alert} from "reactstrap";

class WarningSign extends React.Component {
  render() {
    return <Alert color="danger">{this.props.text}</Alert>;
  }
}

export default WarningSign;
