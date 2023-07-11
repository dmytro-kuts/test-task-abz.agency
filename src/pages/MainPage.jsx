import React from 'react';
import { Link } from 'react-router-dom';

import Background from '../assets/background.jpg';

export const MainPage = () => {
  return (
    <section className="page__test">
      <div className="test__container">
        <div className="test__body body-test">
          <h1 className="body-test__title title">Test assignment for front-end developer</h1>
          <div className="body-test__text text">
            <p>
              What defines a good front-end developer is one that has skilled knowledge of HTML,
              CSS, JS with a vast understanding of User design thinking as they'll be building web
              interfaces with accessibility in mind. They should also be excited to learn, as the
              world of Front-End Development keeps evolving.
            </p>
          </div>
          <Link to='/register' className="body-test__button button">Sign Up</Link>
        </div>
        <img src={Background} alt="Background" />
      </div>
    </section>
  );
};
