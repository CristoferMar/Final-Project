import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      location: 'My-Lists'
    };
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  // componentDidMount() {

  // }

  handleDrawer(event) {
    let drawerStatus = false;
    this.state.drawerOpened ? drawerStatus = false : drawerStatus = true;
    this.setState({ drawerOpened: drawerStatus });
  }

  render() {
    let title = this.state.location;
    title = title.replace('-', ' ');
    return (
      <div className='nav-bar'>
        <img className="small-logo click" src="images/small-logo.svg" alt="small logo 1, 2, Date" />
        <div className="center-content space-between">
          <p className="blue weight-800 center-content align-center">{title}</p>
          <div className="center-content user-circle click" onClick={this.handleDrawer}>U</div>
        </div>
        <div className="absolute">
          {
            this.state.drawerOpened &&
            <div>Hello Words!</div>
          }
        </div>
      </div>

    );
  }
}
