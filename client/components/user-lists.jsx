import React from 'react';

export default class UserLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: []
    };
    this.handleListClick = this.handleListClick.bind(this);
  }

  handleListClick(event) {
    // console.log('event.target:', event.target);
    const listSelected = event.target.getAttribute('id');
    // console.log('listSelected:', listSelected);
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    };
    fetch('/api/lists', req)
      .then(res => res.json())
      .then(userLists => {
        this.setState({ userLists });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="padding-10 width-responsive">
        <div className="flex full-width align-center space-between padding-vert-10n25">
          <h3>Create A New List</h3>
          <a href="#New-List" className="flex align-center">
            <img className="height-25 click" src="images/add-list-btn.svg" alt="add new list" />
          </a>
        </div>

        {
          this.state.userLists.length === 0 &&
          <div className="content-center full-width padding-10">
            You have no lists at the moment.
          </div>
        }
        {
          this.state.userLists.length > 0 &&
          this.state.userLists.map(listItem =>
            <div key={listItem.listId} className="padding-top-5">
              <div className="flex full-width space-between">
                <p onClick={this.handleListClick} id={listItem.listId} className="width-76-percent click">
                  {listItem.listTitle}
                </p>
                <div className="center-content align-center max-height-31">
                  <p className="font-light-responsive center-content align-center">
                    {2500 + ' Items'}
                  </p>
                  <img className="height-17 margin-left-5 click" src="images/gear.svg" alt="configure list" />
                </div>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}
