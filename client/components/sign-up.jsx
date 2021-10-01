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
      <>
        <div className="absolute-login float-right">
          <a href="#Log-In" className="login-btn blue-fill margin-right-10 click">Log In</a>
          <a className="login-btn blue-fill click">Demo User</a>
        </div>

        <div className="full-width center-content align-center">

          <form action="" className="flex align-center column register-border space-between">
            <img className="small-logo" src="/images/small-logo.svg" alt="One Two Date" />
            <h3 className="sign-on-title">Create An Account</h3>
            <div className="full-width">

              <label htmlFor="userName">User Name</label>
              <input name="userName" type="text" id="userName" required className="text-box margin-bottom-7rm" maxLength="30" />

              <label htmlFor="userPassword">Password</label>
              <input name="userPassword" maxLength="30" type="password" id="userPassword" required className="text-box margin-bottom-7rm" />
            </div>
            <div className="full-width">
              <button className="float-right login-btn blue-fill white">Sign Up</button>
            </div>
          </form>

        </div>
      </>
    );
  }
}
