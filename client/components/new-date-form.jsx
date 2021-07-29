import React from 'react';

export default class NewDateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateIdea: '',
      costAmount: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state.dateIdea);
  }

  handleCancel(event) {
    event.preventDefault();
    // window.location.hash = 'My-Lists?listId';
  }

  handleSubmit() {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateIdea: this.state.dateIdea,
        costAmount: this.state.costAmount,
        listId: 1 // this.props.listId in the next feature
      })
    };
    fetch('/api/dates', req)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="full-width full-height center-content align-center">
        <div className="form-container">
          <form className="margin-auto" action="" onSubmit={this.handleSubmit}>
            <h3 className="form-title">Add A Date / Item</h3>

            <label htmlFor="dateIdea">Name of Activity</label>
            <input
              autoFocus
              type="text"
              className="text-box margin-bottom-7rm"
              name="dateIdea"
              id="dateIdea"
              required
              onChange={this.handleChange}
              value={this.state.dateIdea}
            />

            <div className="flex align-center space-between margin-bottom-7rm">
              <label htmlFor="costAmount">Price</label>
              <select
                type="select"
                className="text-box width-70-precent"
                name="costAmount"
                id="costAmount"
                required
                onChange={this.handleChange}
                >
                  <option value="0">Free</option>
                  <option value="10">Less than $10</option>
                  <option value="20">Around $20</option>
                  <option value="40">Around $40</option>
                  <option value="60">Around $60</option>
                  <option value="80">Around $80</option>
                  <option value="120">Around $120</option>
                  <option value="200">Around $200</option>
                  <option value="300">Around $300</option>
                  <option value="400">The High Life</option>
              </select>
            </div>

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
