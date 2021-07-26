import React from 'react';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: 'My-Lists'
    };
  }

  render() {
    let title = this.state.location;
    title = title.replace('-', ' ');
    return (
      <>
        <div className='nav-bar'>
          <img className="small-logo click" src="images/small-logo.svg" alt="small logo 1, 2, Date" />
          <div className="center-content space-between">
            <p className="blue weight-800 center-content align-center">{title}</p>
            <div className="center-content user-circle click">U</div>
          </div>
        </div>

        {/* navbar above ^ */}

        <div className="page with-navbar">
          <div className="padding-10 width-responsive">
            <div className="flex full-width align-center space-between">
              <h3>Create A New List</h3>
              <img className="height-25 click" src="images/add-list-btn.svg" alt="add new list" />
            </div>

            <div className="padding-10">
              <div className="flex full-width space-between">
                <p className="width-76-percent click">My First List</p>
                <div className="center-content space-between width-23-percent max-height-31">
                  <p className="font-light-responsive center-content align-center">
                    {2500 + ' Items'}
                  </p>
                  <img className="height-25 click" src="images/gear.svg" alt="configure list" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}
