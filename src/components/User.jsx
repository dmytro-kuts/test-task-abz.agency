import React, { useState } from 'react';

import PhotoCover from '../assets/photo-cover.svg';

export const User = ({ user }) => {
  const photo = user.photo && (user.photo.includes('.jpeg') || user.photo.includes('.jpg'));

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipValue, setTooltipValue] = useState('');

  const handleMouseEnter = (value) => {
    setTooltipValue(value);
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <article className="get__item item-body">
      <div className="item-body__image">
        {photo ? (
          <img src={user.photo} alt={user.name} />
        ) : (
          <img src={PhotoCover} alt={user.name} />
        )}
      </div>

      <div
        className="item-body__name text"
        onMouseEnter={() => handleMouseEnter(user.name)}
        onMouseLeave={handleMouseLeave}
      >
        {user.name}
      </div>

      <div
        className="item-body__position text"
        onMouseEnter={() => handleMouseEnter(user.position)}
        onMouseLeave={handleMouseLeave}
      >
        {user.position}
      </div>

      <div
        className="item-body__email text"
        onMouseEnter={() => handleMouseEnter(user.email)}
        onMouseLeave={handleMouseLeave}
      >
        {user.email}
      </div>

      <div className="item-body__phone text">{user.phone}</div>

      {tooltipVisible && (
        <div className="item-body__tooltip">{tooltipValue}</div>
      )}
    </article>
  );
};
