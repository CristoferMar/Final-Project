import React from 'react';
import Navbar from './components/nav-bar';
import UserLists from './components/user-lists';
import parseRoute from './lib/parse-route';
import NewListForm from './components/new-list-form';
import NewDateForm from './components/new-date-form';
import ListDetails from './components/list-details';
import GenerateDate from './components/generate-date';
import UserHistory from './components/user-history';
import Lander from './components/landing-page';
import Login from './components/log-in';
import SignUp from './components/sign-up';

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
    if (route.path === 'Landing-Page' || route.path === '') {
      return <Lander />;
    }
    if (route.path === 'Log-In') {
      return <Login />;
    }
    if (route.path === 'Sign-Up') {
      return <SignUp />;
    }
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
    if (route.path === 'My-History') {
      return <UserHistory />;
    }
  }

  render() {
    const { path } = this.state.route;
    const withNav = !['New-List', 'New-Date', 'Langing-Page', '', 'Log-In', 'Sign-Up'].includes(path);
    const pageClass = withNav ? 'page with-navbar' : 'page';
    return (
      <>
        {withNav &&
          <Navbar path={path} />
        }

        <div className={pageClass}>
          {this.renderPage(this.state.route)}
        </div>
      </>
    );
  }
}
