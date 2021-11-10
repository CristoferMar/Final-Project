import React from 'react';

export default class Lander extends React.Component {

  render() {
    return (
        <div className="full-width center-content align-center">

          <div className="absolute-login float-right padding-15n10">
            <a href="#Log-In" className="login-btn blue-fill margin-right-10 click">Log In</a>
            <a className="login-btn blue-fill click">Demo User</a>
          </div>

          <div className="center-content align-center column large-logo">
            <img className="landing-logo" src="/images/landing-logo.svg" alt="One-Two-Date Logo" />
            <a href="#Sign-Up" className="register-btn click center-content align-center">Register Now</a>
          </div>

        </div>
    );
  }

}
