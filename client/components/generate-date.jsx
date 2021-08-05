import React from 'react';

export default class GenerateDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: null,
      priceList: 'Free'
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange() {

  }

  render() {
    return (
      <div className="full-width full-height center-content align-center">

        <div className="form-container border-white">
          <form className="margin-auto" action="" onSubmit={this.handleSubmit}>
            <label htmlFor="listName">Name of New List</label>
            <input
              autoFocus
              type="text"
              className="text-box margin-bottom-7rm"
              name="listName"
              id="listName"
              required
              onChange={this.handleChange}
              value={'this.state.listName'}
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
