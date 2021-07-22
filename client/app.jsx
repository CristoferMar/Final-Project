import React from 'react';
// import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // handleChange(event) {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value });
  // }

  // handleCancel(event) {
  //   event.preventDefault();
  //   this.setState({ listName: '' });
  //   console.log('cancel has been hit');
  //   App.form.reset();
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   console.log("We've hit the submit button:", event);
  //   console.log();
  // }

  render() {
    return (
      <div className="page align-center">
        <div className="form-container">
          <form className="center-content column" action="" onSubmit={this.handleSubmit}>
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
            />
            <div className="center-content space-between">
              <button className="form-btn purple" onClick={this.handleCancel}>Cancel</button>
              <input type="submit" className="form-btn blue" value="Save" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
