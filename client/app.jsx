import React from 'react';
import Navbar from './components/nab-bar';
import UserLists from './components/user-lists';
import parseRoute from './lib/parse-route';
import NewListForm from './components/newList-Form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar: true,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const route = this.state.route;
    if (route.path === 'My-Lists') {
      return <UserLists />;
    }
    if (route.path === 'New-List') {
      return <NewListForm />;
    }
  }

  render() {
    const { path } = this.state.route;
    let background = 'page';
    this.state.navbar ? background = 'page with-navbar' : background = 'page';

    return (
      <>
        {path !== 'New-List' &&
          <Navbar path={path} />
        }

        <div className={background}>
          {this.renderPage(this.state.route)}
        </div>
      </>
    );
  }
}
