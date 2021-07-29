import React from 'react';

export default class ListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
  }

  componentDidMount() {
    req = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listId: this.props // missing logic
      })
    };
    fetch('/api/dates', (req));
  }
}
