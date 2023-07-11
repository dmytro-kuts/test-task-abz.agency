import React from 'react';

import SuccessSvg from '../assets/success-image.svg';

export const Success = () => {
  return (
    <>
      <h2 className="post__title title">User successfully registered</h2>
      <img src={SuccessSvg} alt="SuccessSvg" />
    </>
  );
};
