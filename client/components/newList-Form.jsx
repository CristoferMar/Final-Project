import React from 'react';

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
    this.setState({ listName: '' });
  }

  handleSubmit() {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listName: this.state.listName
      })
    };
    fetch('/api/lists', req)
      .then(res => res.json())
      .then(() => this.setState({ listName: '' }));
  }

  render() {
    return (
      <div className="page align-center">
        <div className="form-container">
          <form className="margin-auto" action="" onSubmit={this.handleSubmit}>
            <h3 className="form-title">Create A New List</h3>
            <label htmlFor="listName">Name of New List</label>
            <input
              autoFocus
              type="text"
              className="text-box"
              name="listName"
              id="listName"
              required
              onChange={this.handleChange}
              value={this.state.listName}
            />
            <div className="center-content space-between full-width">
              <button className="form-btn purple-fill click" onClick={this.handleCancel}>Cancel</button>
              <input type="submit" className="form-btn blue-fill click" value="Save" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
