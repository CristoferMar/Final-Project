import React, { useState } from 'react';

export default function ListItem(props) {

  const [isActive, toggleActive] = useState(props.dateInfo.isActive);
  // console.log('isActive:', isActive);
  // toggleActive(!isActive);
  let imgURL = '../../server/images/checked-box.svg';
  let imgAlt = 'checked';
  let itemClasses = 'width-76-percent click';

  // image pathways are not working
  if (isActive) {
    imgURL = 'server/public/images/checked-box.svg';
    imgAlt = 'checked';
    itemClasses = 'width-76-percent click';
  } else {
    imgURL = 'server/public/images/unchecked-box.svg';
    imgAlt = 'unchecked';
    itemClasses = 'width-76-percent click strike';
  }

  const setIsActive = () => {
    toggleActive(!isActive);
    props.dateInfo.isActive = !props.dateInfo.isActive;
    // console.log('props.dateInfo from callback:', props.dateInfo);
  };

  return (
      <div className="flex full-width space-between">

        <div className="flex" onClick={() => setIsActive()}>
          <img src={imgURL} alt={imgAlt} />
          <p className={itemClasses} >
            {props.dateInfo.dateIdea}
          </p>
        </div>

        <div className="center-content align-center max-height-31">
          <img className="height-17" src="/images/cost-icon.svg" alt="configure list" />
          <p className="margin-left-5 font-light-responsive center-content align-center">
            {props.dateInfo.costAmount}
          </p>
        </div>

      </div>
  );
}
