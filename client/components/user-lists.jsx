import React from 'react';

export default class UserLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: []
    };
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
          <div className="flex full-width align-center space-between">
            <h3>Create A New List</h3>
            <a href="#New-List">
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
            <div key={listItem.listId} className="padding-10">
              <div className="flex full-width space-between">
                <p className="width-76-percent click">{listItem.listTitle}</p>
                <div className="center-content space-between width-23-percent max-height-31">
                  <p className="font-light-responsive center-content align-center">
                    {2500 + ' Items'}
                  </p>
                  <img className="height-25 click" src="images/gear.svg" alt="configure list" />
                </div>
              </div>
            </div>
            )
          }

        </div>
    );
  }
}