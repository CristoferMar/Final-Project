import React from 'react';

export default class Navbar extends React.Component {
  render() {
    let title = this.props.path;
    title = title.replace('-', ' ');
    return (
      <div className='nav-bar padding-10'>
        <img className="small-logo click" src="/images/small-logo.svg" alt="small logo 1, 2, Date" />
        <div className="center-content ">
          <p className="blue weight-800 center-content align-center">{title}</p>
          <div className="center-content user-circle click">U</div>
        </div>
      </div>
    );
  }
}
