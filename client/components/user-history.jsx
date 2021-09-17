import React from 'react';

export default class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      historyLoaded: false,
      currentTime: new Date()
    };
    this.calculateTime = this.calculateTime.bind(this);
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    };
    fetch('api/history', req)
      .then(res => res.json())
      .then(userHistory => {
        this.setState({ history: userHistory, historyLoaded: true });
        // console.log(this.state);
        // console.log(this.state.history[0].addedAt);
      });
  }

  // still need to work out the second / minute / day calculations
  calculateTime(timeString) {
    const oldTime = new Date(timeString);
    const elapsedSeconds = (this.state.currenttime - oldTime) / 1000;
    if (elapsedSeconds < 60) return `${Math.floor(elapsedSeconds)} s ago`;
    if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)} m ago`;
    if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)} h ago`;
    if (elapsedSeconds < 2592000) return `${Math.floor(elapsedSeconds / 86400)} d ago`;
    return oldTime.toLocaleString();
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
                      <div className="full-width">
                          <div>
                            Used 3 of Clubs from Deck of Cards
                          </div>
                      </div>
                    </>
                }
              </>
            : <div className="full-width center-content">
                <div className="lds-dual-ring"></div>
              </div>
          }
        </div>
      </>
    );
  }
}
