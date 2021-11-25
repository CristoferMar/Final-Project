import React from 'react';
import DemoUser from './demo-user';

export default class Lander extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: window.location.hash === '#Log-In',
      newUser: window.location.hash === '#Sign-Up',
      userName: '',
      userPassword: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.target.textContent === 'Log In'
      ? window.location.hash = '#Log-In'
      : window.location.hash = '#Sign-Up';
  }

  render() {
    return (
        <div className="full-width center-content align-center">

          <div className="absolute-login float-right padding-15n10">
            <button onClick={this.handleClick} className="width-80px white login-btn blue-fill margin-right-10 click">Log In</button>
            <DemoUser handleSignOn={this.props.signInHandler}/>
          </div>

          <div className="center-content align-center column large-logo">
            <img className="landing-logo" src="/images/landing-logo.svg" alt="One-Two-Date Logo" />
            <button onClick={this.handleClick} className="register-btn click center-content align-center">Register Now</button>
          </div>

        </div>
    );
  }

}
