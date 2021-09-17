import React from 'react';

export default class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      historyLoaded: false
    };

  }

  componentDidMount() {
    // const req = {
    //   method: 'GET',
    //   header: { 'Content-Type': 'application/json' }
    // };
    // fetch('api/history', req)
    //   .then(res => res.json())
    //   .then(userHistory => {
    //     this.setState({ history: userHistory, historyLoaded: true });
    //     console.log(this.state);
    //   });
  }

  render() {
    return (
      <>
        <div className="padding-10 width-responsive">
          <div className="full-width center-content padding-vert-10n25">
            <h3>My History</h3>
          </div>
          {this.state.historyLoaded
            ? <>
                {
                  !this.state.history.length
                    ? <>
                    <p className="form-title">It seems you haven&apos;t chosen to do any of your dates/items.</p>
                    <p className="form-title">When you generate a item then hit &quot;Let&apos;s Do This&quot;, the items will appear here, with the most recent item at the top.</p>
                  </>
                    : <>
                    <div className="full-width">Yay</div>
                  </>
                }
              </>
            : <>
              <div className="full-width center-content">
                <div className="lds-dual-ring"></div>
              </div>
            </>
          }
        </div>
      </>
    );
  }
}
