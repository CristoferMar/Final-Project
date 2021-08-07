import React from 'react';

export default class GenerateDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listsHaveLoaded: false,
      userLists: [],
      listChoiseId: '',
      costAmount: '0',
      randomDate: [],
      randomHasLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
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

  handleReturn() {
    this.setState({ randomHasLoaded: false });
  }

  handleSubmit() {
    event.preventDefault();
    const req = {
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/random?costAmount=${this.state.costAmount}&listId=${this.state.listChoiseId}`, req)
      .then(res => res.json())
      .then(date => {
        this.setState({ randomDate: date, randomHasLoaded: true });
      });
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
      <div className="full-width full-height-nim-nav center-content align-center">

        {!this.state.randomHasLoaded &&
          <form className="height-100-percent" onSubmit={this.handleSubmit}>
            <div className="flex align-center height-XX-percent">
              <div className="form-container border-white">
                <label htmlFor="listChoices">Which list are we using?</label>
                <select name="listChoiseId" id="listChoiseId"
                  className="text-box margin-bottom-7rm"
                  defaultValue={this.state.listChoiseId}
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
                  onChange={this.handleChange}>
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
          <div className="full-width fixed">
            <button className="height-70 purple-fill click-up generate-btn">
              Generate Date
            </button>
          </div>
        </form>
      }

      {(this.state.randomHasLoaded && this.state.randomDate.length > 0) &&
        <div className="form-container">
          <form className="margin-auto" action="" onSubmit={this.handleSubmit}>
            <h3 className="form-title">Drawing Result:</h3>
            <h2 className="margin-auto form-title">{this.state.randomDate[0].dateIdea}</h2>
            <div className="center-content space-between full-width">
              <button className="form-btn purple-fill click">Draw Again</button>
              <button className="form-btn blue-fill click" onClick={this.handleReturn}>Let&rsquo;s Do This</button>
            </div>
          </form>
        </div>
      }

      {(this.state.randomHasLoaded && !this.state.randomDate.length) &&
        <div className="form-container">
            <h3 className="form-title">This list seems to be empty or no items have that cost</h3>
          {/* <h3 className="form-title">Or none have that cost</h3> */}
          <p className="form-title">You can add dates/items to this list in your <a href={`#Read-List?listId=${this.state.listChoiseId}`} className="blue">Read-Lists</a> page.</p>
          <div >
            <button className="form-btn purple-fill full-width click" onClick={this.handleReturn}>Go back to Generator?</button>
          </div>
        </div>
      }
      </div>
      </>
    );
  }
}
