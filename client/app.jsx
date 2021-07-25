import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: 'drawer-close',
      location: 'My-Lists'
    };
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  // componentDidMount() {

  // }

  handleDrawer(event) {
    let drawerStatus = '';
    this.state.drawerOpened === 'drawer-open' ? drawerStatus = 'drawer-close' : drawerStatus = 'drawer-open';
    this.setState({ drawerOpened: drawerStatus });
  }

  render() {
    let title = this.state.location;
    title = title.replace('-', ' ');
    return (
      <>
        <div className='nav-bar'>
          <img className="small-logo click" src="images/small-logo.svg" alt="small logo 1, 2, Date" />
          <div className="center-content space-between">
            <p className="blue weight-800 center-content align-center">{title}</p>
            <div className="center-content user-circle click" onClick={this.handleDrawer}>U</div>
          </div>
          <div className={'absolute ' + this.state.drawerOpened}>
            <p className="click">Generate Date</p>
            <p className="click">My Lists</p>
            <p className="click">My History</p>
            <p className="click">What&apos;s Poppin</p>
            <p><hr className="solid" /></p>
            <p className="red click">Sign Out</p>
          </div>
        </div>

        {/* navbar above ^ */}

        <div className="page align-center">

        </div>
      </>
    );
  }
}
