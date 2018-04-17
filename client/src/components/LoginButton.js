import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const LoginButton = (props) => (
  <FlatButton className="flatbutton" label="Log In" onClick={props.onClick} />
);

export default LoginButton;
