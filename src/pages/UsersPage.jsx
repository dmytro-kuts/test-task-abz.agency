import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { User } from '../components/User';
import { Preloader } from '../components/Preloader';

import { getUsers, setCurrentPage } from '../redux/slices/user/userSlice';

export const UsersPage = () => {
  const dispatch = useDispatch();

  const { users, currentPage, totalPages, isLoading } = useSelector((state) => state.user);

  const showMoreUsers = () => {
    try {
      dispatch(setCurrentPage());
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    dispatch(getUsers(currentPage));
  }, [dispatch, currentPage]);

  return (
    <section className="page__get">
      <div className="get__container">
        <h2 className="get__title title">Working with GET request</h2>
        <div className="get__items">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
        {isLoading ? (
          <Preloader />
        ) : (
          <button
            onClick={showMoreUsers}
            className={
              currentPage === totalPages ? 'get__button button hidden' : 'get__button button'
            }
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
};
