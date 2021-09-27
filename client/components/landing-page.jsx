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
      <>
        <div className="full-width center-content align-center">

          <div className="absolute-login float-right padding-10">
            <button className="login-btn blue-fill margin-right-10 click">Log In</button>
            <button className="login-btn blue-fill click">Demo User</button>
          </div>

          <div className="flex align-center column">
            <img className="landing-logo" src="/images/landing-logo.svg" alt="One-Two-Date Logo" />
            <button className="register-btn click" >Register Now</button>
          </div>

        </div>
      </>
    );
  }

}
