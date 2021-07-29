import React from 'react';
import Navbar from './components/nav-bar';
import UserLists from './components/user-lists';
import parseRoute from './lib/parse-route';
import NewListForm from './components/new-list-form';
import NewDateForm from './components/new-date-form';
import ListDetails from './components/list-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (route.path === 'New-Date') {
      return <NewDateForm />;
    }
    if (route.path === 'Lists') {
      return <ListDetails listId={route.params.listId} />;
    }
  }

  render() {
    const { path } = this.state.route;
    return (
      <>
        {(path !== 'New-List' && path !== 'New-Date') &&
          <Navbar path={path} />
        }

        <div className="page with-navbar">
          {this.renderPage(this.state.route)}
        </div>
      </>
    );
  }
}
