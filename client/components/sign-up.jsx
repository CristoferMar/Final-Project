import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'cris'
    };
  }

  render() {
    return (
      <div>Hello Sign-Up Page</div>
    );
  }
}
