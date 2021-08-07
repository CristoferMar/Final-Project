import React from 'react';
import Navbar from './components/nav-bar';
import UserLists from './components/user-lists';
import parseRoute from './lib/parse-route';
import NewListForm from './components/new-list-form';
import NewDateForm from './components/new-date-form';
import ListDetails from './components/list-details';
import GenerateDate from './components/generate-date';

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
      return <NewDateForm listId={route.params.get('listId')} />;
    }
    if (route.path === 'Read-List') {
      return <ListDetails listId={route.params.get('listId')} />;
    }
    if (route.path === 'Generate-Date') {
      return <GenerateDate />;
    }
  }

  render() {
    const { path } = this.state.route;
    const nonNav = ['New-List', 'New-Date'];
    const nav = nonNav.includes(path);
    let hasNav = 'with-navbar';
    nav ? hasNav = '' : hasNav = 'with-navbar';
    return (
      <>
        {!nav &&
          <Navbar path={path} />
        }

        <div className={`page ${hasNav}`}>
          {this.renderPage(this.state.route)}
        </div>
      </>
    );
  }
}
