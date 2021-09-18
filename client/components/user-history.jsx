import React from 'react';

export default class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      historyLoaded: false,
      currentTime: new Date()
    };
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
      });
  }

  render() {
    const calculateTime = timeString => {
      const oldTime = new Date(timeString);
      const elapsedSeconds = (this.state.currentTime - oldTime) / 1000;
      if (elapsedSeconds < 60) return `${Math.floor(elapsedSeconds)} sec ago`;
      if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)} min ago`;
      if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)} hr ago`;
      if (elapsedSeconds < 2592000) return `${Math.floor(elapsedSeconds / 86400)} dy ago`;
      return oldTime.toLocaleString();
    };
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
                        {this.state.history.map(item =>
                          <div className="full-width flex space-between" key={item.addedAt}>
                            <div className="margin-bottom-10 font-1rm">
                              <p><i>{item.dateIdea}</i></p>
                              <p>from <i>{item.listTitle}</i></p>
                            </div>
                            <div className="text-right font-small elapsedTime">
                              {calculateTime(item.addedAt)}
                            </div>
                          </div>
                        )}
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
