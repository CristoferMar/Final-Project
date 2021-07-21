import React from 'react';

export default class newListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('event.target:', event.target);
    const { name, value } = event.target;
    console.log('name:', name);
    console.log('value:', value);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <div className="flex horiz-center">
          <div>
            <h2>Create A New List</h2>
          </div>
          <div>
            <label htmlFor="newList" className="form-label">
              Name of New List
            </label>
            <input
              type="text"
              required
              id="newList"
              name="newList"
              onChange={this.handleChange}
              className="" />
          </div>
        </div>
      </form>
    );
  }
}
