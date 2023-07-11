import React from 'react';

export const User = ({ user }) => {
  return (
    <article className="get__item item-body">
      <div className="item-body__image">
        <img src={user.photo} alt={user.name} />
      </div>
      <div className="item-body__name">{user.name}</div>
      <div className="item-body__position text">{user.position}</div>
      <div className="item-body__email text">{user.email}</div>
      <div className="item-body__phone text">{user.phone}</div>
    </article>
  );
};
