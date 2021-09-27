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
            <div>
              <img className="landing-logo" src="/images/landing-logo.svg" alt="" />
            </div>
            <a><img className="click" src="/images/register-now.svg" alt="" /></a>
          </div>

        </div>
      </>
    );
  }

}
