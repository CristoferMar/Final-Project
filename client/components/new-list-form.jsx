import React from 'react';
import AppContext from '../lib/app-context';

export default class NewListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCancel(event) {
    event.preventDefault();
    window.location.hash = 'My-Lists';
  }

  handleSubmit() {
    event.preventDefault();
    const { token } = this.context.token;

    const req = {
      method: 'POST',
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listName: this.state.listName
      })
    };
    fetch('/api/lists', req)
      .then(res => res.json())
      .then(() => {
        window.location.hash = 'My-Lists';
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
        <div className="full-width full-height center-content align-center">
          <div className="form-container">
            <form className="margin-auto" action="" onSubmit={this.handleSubmit}>
              <h3 className="form-title">Create A New List</h3>
              <label htmlFor="listName">Name of New List</label>
              <input
                autoFocus
                type="text"
                className="text-box margin-bottom-7rm"
                name="listName"
                id="listName"
                required
                onChange={this.handleChange}
                value={this.state.listName}
              />
              <div className="center-content space-between full-width">
                <button className="form-btn purple-fill click" onClick={this.handleCancel}>Cancel</button>
                <button className="form-btn blue-fill click">Save</button>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

NewListForm.contextType = AppContext;

// import AppContext from '../lib/app-context';
// NewListForm.contextType = AppContext;
