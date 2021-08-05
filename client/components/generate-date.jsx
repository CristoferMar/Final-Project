import React from 'react';

export default class GenerateDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listsHaveLoaded: false,
      userLists: [],
      listChoiseId: '',
      costAmount: 'Free'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    };
    fetch('/api/lists', req)
      .then(res => res.json())
      .then(userLists => {
        this.setState({
          userLists,
          listsHaveLoaded: true,
          listChoiseId: userLists[0].listId.toString()
        });
      })
      .catch(err => console.error(err));
  }

  handleSubmit() {
    event.preventDefault();
    console.log('form has been submitted');
    console.log('this.state:', this.state);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="full-width full-height-nim-nav center-content align-center">
        <form className="height-100-percent" onSubmit={this.handleSubmit}>

          <div className="flex align-center height-XX-percent">

        <div className="form-container border-white">
            <label htmlFor="listChoices">Which list are we using?</label>

            <select name="listChoiseId" id="listChoiseId"
            className="text-box margin-bottom-7rm"
              onChange={this.handleChange}>
              { (!this.state.userLists.length && this.state.listsHaveLoaded) &&
                <option value="nullList">It seems you don&rsquo;t have any lists</option>
              }
              {this.state.userLists.length &&
                this.state.userLists.map(listItem =>
                  <option key={listItem.listId} value={listItem.listId}>
                    {listItem.listTitle}
                  </option>
                )
              }
            </select>

            <div className="flex align-center space-between">
              <label htmlFor="costAmount">Cost Estimate</label>
              <select
                type="select"
                className="text-box width-55-percent"
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
        </div>

        </div>

        {/* <div className="divide"></div> */}

        <div className="full-width">
            <button className="height-70 purple-fill click generate-btn">Generate Date</button>
        </div>

      </form>
      </div>
    );
  }
}
