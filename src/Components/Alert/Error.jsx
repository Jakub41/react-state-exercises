import React from "react";
import {Alert} from "reactstrap";

const Error = props => {
  return (
    <div>
      <Alert color="danger">{this.props.message}</Alert>
    </div>
  );
};

export default Error;
