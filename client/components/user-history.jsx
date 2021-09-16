import React from 'react';

export default class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };

  }

  componentDidMount() {
    const req = {
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    };
    fetch('api/history', req)
      .then(res => res.json())
      .then(userHistory => {
        this.setState({ history: userHistory });
        // console.log(this.state);
      });
  }

  render() {
    return (
      <>
        <div className="padding-10 width-responsive">My History</div>
      </>
    );
  }
}
