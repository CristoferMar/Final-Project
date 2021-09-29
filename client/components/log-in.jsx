import React from 'react';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'cris'
    };
  }

  render() {
    return (
        <div>Hello Log in Page</div>
    );
  }
}
