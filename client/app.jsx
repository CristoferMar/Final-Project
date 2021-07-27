import React from 'react';
import Navbar from './components/nab-bar';
import UserLists from './components/user-lists';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: 'My-Lists',
      navbar: true
    };
  }

  render() {
    let background = 'page';
    this.state.navbar ? background = 'page with-navbar' : background = 'page';

    return (
      <>
        { this.state.navbar &&
          <Navbar location={this.state.location}/>
        }

        <div className={background}>
          <UserLists />
        </div>
      </>
    );
  }
}
