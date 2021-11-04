import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: 'drawer-close'
    };
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  // componentDidMount() {
  //   const contextType = AppContext;
  //   console.log('this:', this);

  //   console.log('this.context:', this.context);
  //   console.log('this.context.token.user.username:', this.context.token.user.username);

  // }

  handleDrawer(event) {
    const drawerStatus = this.state.drawerOpened === 'drawer-open'
      ? 'drawer-close'
      : 'drawer-open';
    this.setState({ drawerOpened: drawerStatus });
  }

  handleSignOut() {
    window.localStorage.removeItem('one-two-date-jwt');
    this.props.signOutHandler();
    console.log('the sign out action has run');
    window.location.hash = '';
  }

  handleClick() {
    let destination = event.target.textContent;
    destination = destination.replace(' ', '-');
    window.location.hash = destination;
    this.setState({ drawerOpened: 'drawer-close' });
  }

  render() {
    const userName = this.context.token ? this.context.token.user.username : null;
    let userNameFirst = null;
    if (userName) { userNameFirst = userName.toString().charAt(0); }
    // console.log('userName:', userName);
    let title = this.props.path;
    title = title.replace('-', ' ');
    return (
      <>
        <div className='nav-bar padding-10'>
          <img className="small-logo click" src="/images/small-logo.svg" alt="small logo 1, 2, Date" />
          <div className="center-content ">
            <p className="blue weight-800 center-content align-center">{title}</p>
            <div className="center-content user-circle click" onClick={this.handleDrawer}>
              {/* U */}
              {userNameFirst}
            </div>
          </div>
        </div>
        <div className={'absolute ' + this.state.drawerOpened}>
          <p className="click nav-btn" onClick={this.handleClick}>Generate Date</p>
          <p className="click nav-btn padding-top-5" onClick={this.handleClick}>My Lists</p>
          <p className="click nav-btn padding-top-5" onClick={this.handleClick}>My History</p>
          <hr className="solid" />
          <p className="red click " onClick={this.handleSignOut}>Sign Out</p>
        </div>
      </>
    );
  }
}

Navbar.contextType = AppContext;
