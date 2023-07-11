import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form } from '../components/Form';
import { Success } from '../components/Success';

import { setStatusDefault } from '../redux/slices/auth/authSlice';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        navigate('/users');
        dispatch(setStatusDefault());
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [status, navigate, dispatch]);

  return (
    <section className="page__post">
      <div className="post__container">
        <h2 className="post__title title">Working with POST request</h2>
        {status ?   <Success /> : <Form />}
      </div>
    </section>
  );
};
