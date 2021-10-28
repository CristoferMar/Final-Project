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
import SignOn from './components/sign-on';
// import decodeToken from './lib/decode-token';
// import AppContext from './lib/app-context';

// This is what any given token looks like:
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJ1c2VybmFtZSI6InlvWDMiLCJpYXQiOjE2MzQ2ODY3ODB9.pDXNIQPcAV6nIjh7ho_zQ1gVPK5VayeegTiOJEldQ6I",
//     "user": {
//     "userId": 47,
//       "username": "yoX3"
//   }
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: JSON.parse(window.localStorage.getItem('one-two-date-jwt')),
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    // this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });

    // const token = JSON.parse(window.localStorage.getItem('one-two-date-jwt'));
    // token = token ? decodeToken(token.token) : null;
    console.log('token:', this.state.token);
    // this.setState({ token, isAuthorizing: false });
  }

  handleSignIn() {
    console.log('you invoked app.handleSignIn');
    this.setState({ isAuthorizing: false, token: JSON.parse(window.localStorage.getItem('one-two-date-jwt')) });
  }

  handleSignOut() {
    console.log('you invoked app.handleSignOut');
    this.setState({ isAuthorizing: true, token: JSON.parse(window.localStorage.getItem('one-two-date-jwt')) });

  }

  // handleSignIn might be better suited for the sign-on.jsx component.
  // not sure if this will work, but maybe app.jsx can reckeck if localstarage.user exists, to determine next action
  // handleSignIn(result) {
  //   const { user, token } = result;
  //   window.localStorage.setItem('one-two-date-jwt', token);
  //   this.setState({ user });
  // }

  // handleSignOut might be better suited to go into the navbar, where users can access the sign out button
  // handleSignOut() {
  //   window.localStorage.removeItem('one-two-date-jwt');
  //   this.setState({ user: null });
  // }

  renderPage() {
    // this.setState({ token: JSON.parse(window.localStorage.getItem('react-context-jwt')) });
    const { isAuthorizing, route } = this.state;
    if (isAuthorizing) {
      if (route.path === '') {
        return <Lander />;
      } else if (route.path === 'Sign-Up' || route.path === 'Log-In') {
        return <SignOn signInHandler={this.handleSignIn}/>;
      } else {
        window.location.hash = '';
      }
    } else { window.location.hash = '#My-Lists'; }
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

    // if (this.state.isAuthorizing) return null;
    // const { user, route } = this.state;
    // const { handleSignIn, handleSignOut } = this;
    // const contextValue = { user, route, handleSignIn, handleSignOut };

    return (
      // <AppContext.Provider value={contextValue}>
      <>
        {withNav &&
          <Navbar path={path} username={this.state.token} />
        }

        <div className={pageClass}>
          {this.renderPage(this.state.route)}
        </div>
      </>
      // </AppContext.Provider>
    );
  }
}
