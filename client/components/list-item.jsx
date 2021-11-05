import React, { useState } from 'react';

export default function ListItem(props) {

  const [isActive, toggleActive] = useState(props.dateInfo.isActive);
  let imgURL = '../../server/images/checked-box.svg';
  let imgAlt = 'checked';
  let strikeClass = '';
  if (isActive) {
    imgURL = '/images/checked-box.svg';
    imgAlt = 'checked';
  } else {
    imgURL = '/images/unchecked-box.svg';
    imgAlt = 'unchecked';
    strikeClass = ' strike';
  }

  const setIsActive = () => {
    const req = {
      method: 'PATCH',
      headers: {
        'x-access-token': `${props.token}`,
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/dateActive/${props.dateInfo.dateId}`, req)
      .then(() => toggleActive(!isActive))
      .catch(err => console.error(err));
  };

  return (
      <div className="flex full-width space-between">

      <a className="flex click" onClick={e => { e.preventDefault(); setIsActive(); }}>
        <img className="margin-right-10" src={imgURL} alt={imgAlt} />
        <p className={`full-width${strikeClass}`} >{props.dateInfo.dateIdea}</p>
      </a>

        <div className="center-content align-center max-height-31">
          <img className="height-17" src="/images/cost-icon.svg" alt="configure list" />
          <p className="margin-left-5 font-light-responsive center-content align-center">
            {props.dateInfo.costAmount}
          </p>
        </div>

      </div>
  );
}
