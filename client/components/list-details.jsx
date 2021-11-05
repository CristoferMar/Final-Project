import React from 'react';
import ListItem from './list-item';
import AppContext from '../lib/app-context';

export default class ListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      listData: null
    };
  }

  componentDidMount() {
    const { token } = this.context.token;
    this.setState({ token });

    const req = {
      method: 'GET',
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/dates/${this.props.listId}`, req)
      .then(res => res.json())
      .then(listData => this.setState({ listData }))
      .catch(err => console.error(err));
  }

  render() {
    let listTitle = null;
    let dateIdeas = null;
    let listId = null;
    if (this.state.listData) {
      listTitle = this.state.listData.listTitle;
      dateIdeas = this.state.listData.dateIdeas;
      listId = this.state.listData.listId;
    }

    return (
      <div className="padding-10 width-responsive">
       {
          listTitle &&
          <>
            <div className="flex space-between full-width align-center padding-vert-10n25">
              <a href="#My-Lists" className="flex align-center float-left">
                <img className="height-25 click" src="/images/tri-colored-back-arrow.svg" alt="add new list" />
              </a>
              <h3 className="center-content align-center">{listTitle}</h3>
              <div className="width-25"></div>
            </div>
            <div className="center-content align-center space-between margin-bottom-10">
              <h4>
                Add Date/Item?
              </h4>
                <a href={`#New-Date?listId=${listId}`}><img className="height-25 click" src="/images\add-date-btn.svg" alt="add date or item" /></a>
            </div>
          </>
        }
        {
          dateIdeas && !dateIdeas[0] &&
            <div className="content-center full-width padding-10">
              You have no dates or items in this list.
            </div>
        }
        {
          dateIdeas && dateIdeas[0] &&
            dateIdeas.map(item =>
              <div key={item.dateId} id={item.dateId} className="padding-top-5">
                <ListItem dateInfo={item} token={this.state.token} />
              </div>
            )
        }
        {
          listTitle === undefined &&
            <>
              <div className="padding-vert-10n25" >This list ID is not available</div>
              <a href="#My-Lists" className="center-content align-center">
                <img className="height-25 click" src="/images/tri-colored-back-arrow.svg" alt="add new list" />
                <span className="margin-left-5">Return to My Lists?</span>
              </a>
            </>
        }
      </div>
    );
  }
}

ListDetails.contextType = AppContext;
