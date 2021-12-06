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

  handleDrawer(event) {
    const drawerStatus = this.state.drawerOpened === 'drawer-open'
      ? 'drawer-close'
      : 'drawer-open';
    this.setState({ drawerOpened: drawerStatus });
  }

  handleSignOut() {
    this.props.signOutHandler();
  }

  handleClick() {
    let destination = event.target.textContent;
    destination = destination.replace(' ', '-');
    window.location.hash = destination;
    this.setState({ drawerOpened: 'drawer-close' });
  }

  render() {
    const userName = this.context.token ? this.context.token.user : null;
    let userNameFirst = null;
    userNameFirst = userName && userName.toString().charAt(0);
    let title = this.props.path;
    title = title.replace('-', ' ');
    return (
      <>
        <div className='nav-bar padding-10'>
          <a href="#Generate-Date">
            <img className="small-logo click" src="/images/small-logo.svg" alt="small logo 1, 2, Date" />
          </a>
          <div className="center-content ">
            <p className="blue weight-800 center-content align-center">{title}</p>
            <div className="center-content user-circle click" onClick={this.handleDrawer}>
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
