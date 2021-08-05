import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: 'drawer-close'
    };
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDrawer(event) {
    let drawerStatus = '';
    this.state.drawerOpened === 'drawer-open'
      ? drawerStatus = 'drawer-close'
      : drawerStatus = 'drawer-open';
    this.setState({ drawerOpened: drawerStatus });
  }

  handleClick() {
    let destination = event.target.textContent;
    destination = destination.replace(' ', '-');
    window.location.hash = destination;
    this.setState({ drawerOpened: 'drawer-close' });
  }

  render() {
    let title = this.props.path;
    title = title.replace('-', ' ');
    return (
      <>
        <div className='nav-bar padding-10'>
          <img className="small-logo click" src="/images/small-logo.svg" alt="small logo 1, 2, Date" />
          <div className="center-content ">
            <p className="blue weight-800 center-content align-center">{title}</p>
            <div className="center-content user-circle click" onClick={this.handleDrawer}>U</div>
          </div>
        </div>
        <div className={'absolute ' + this.state.drawerOpened}>
          <p className="click nav-btn" onClick={this.handleClick}>Generate Date</p>
          <p className="click nav-btn padding-top-5" onClick={this.handleClick}>My Lists</p>
          {/* <p className="click nav-btn padding-top-5">My History</p>
          <p className="click nav-btn padding-top-5">Discover Lists</p> */}
          <hr className="solid" />
          <p className="red click ">Sign Out</p>
        </div>
      </>
    );
  }
}
