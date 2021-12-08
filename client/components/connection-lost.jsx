import React from 'react';

export default class ConnectionLost extends React.Component {
  render() {
    return (
      <div className='center-content column'>
        <h1 className="form-title">AHHHH! What&apos;s Happening?</h1>
        <p className="text-center">Oh wait, the internet went out.</p>
        <p className="text-center">Can you check on that, please?</p>
      </div>
    );
  }
}
