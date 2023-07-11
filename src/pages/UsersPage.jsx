import React from 'react';
import { User } from '../components/User';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers, setCurrentPage } from '../redux/slices/user/userSlice';

export const UsersPage = () => {
  const dispatch = useDispatch();

  const { users, currentPage, totalPages } = useSelector((state) => state.user);

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
        <button
          onClick={showMoreUsers}
          className={
            currentPage === totalPages ? 'get__button button hidden' : 'get__button button'
          }
        >
          Show more
        </button>
      </div>
    </section>
  );
};
