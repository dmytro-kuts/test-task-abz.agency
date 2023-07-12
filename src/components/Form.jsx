import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Preloader } from '../components/Preloader';
import { getPositions, getMeToken, registerUser } from '../redux/slices/auth/authSlice';

import useForm from '../hooks/useForm';

export const Form = () => {
  const dispatch = useDispatch();

  const { positions, token, isLoading, isPendingRequest } = useSelector((state) => state.auth);

  const {
    userName,
    email,
    phone,
    position,
    photo,
    userNameError,
    setUserNameError,
    emailError,
    setEmailError,
    phoneError,
    setPhoneError,
    photoError,
    setPhotoError,
    positionError,
    setPositionError,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handlePositionChange,
    handlePhotoChange,
  } = useForm();

  const [formValid, setFormValid] = React.useState(false);

  const fieldsValidation = (e) => {
    e.preventDefault();
    if (
      userName &&
      email &&
      phone &&
      position &&
      photo &&
      !userNameError &&
      !emailError &&
      !phoneError &&
      !photoError &&
      !positionError
    ) {
      handleSubmit();
    } else {
      if (!userName) {
        setUserNameError('Please enter a name');
      }
      if (!email) {
        setEmailError('Please enter an email');
      }
      if (!phone) {
        setPhoneError('Please enter a phone');
      }
      if (!photo) {
        setPhotoError('Please upload a photo');
      }
      if (!positions) {
        setPositionError('Please select a position');
      }
    }
  };

  const handleSubmit = () => {
    try {
      const formData = new FormData();
      formData.append('name', userName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('photo', photo);
      formData.append('position_id', position);

      dispatch(registerUser({ formData, token }));
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    dispatch(getPositions());
    dispatch(getMeToken());
  }, [dispatch]);

  React.useEffect(() => {
    setFormValid(
      userName &&
        email &&
        phone &&
        position &&
        photo &&
        !userNameError &&
        !emailError &&
        !phoneError &&
        !photoError &&
        !positionError,
    );
  }, [
    userName,
    email,
    phone,
    position,
    photo,
    userNameError,
    emailError,
    phoneError,
    photoError,
    positionError,
  ]);

  return (
    <form className="post__form form" onSubmit={fieldsValidation}>
      <div className="form__item">
        {userNameError && <span className="form__error">{userNameError}</span>}
        <input
          name="name"
          type="text"
          value={userName}
          onChange={handleNameChange}
          placeholder="Your name"
          className={userNameError ? 'form__input _error' : 'form__input'}
          autoComplete="on"
        />
      </div>
      <div className="form__item">
        {emailError && <span className="form__error">{emailError}</span>}
        <input
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
          className={emailError ? 'form__input _error' : 'form__input'}
          autoComplete="on"
        />
      </div>

      <div className="form__item">
        {phoneError && <span className="form__error">{phoneError}</span>}
        <input
          type="tel"
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
          className={phoneError ? 'form__input _error' : 'form__input'}
          autoComplete="on"
        />
        <label htmlFor="phone" className="form__label">
          +380 (XXX) XXX - XX - XX
        </label>
      </div>

      <div className="form__item-checkbox item-checkbox">
        <h3 className="item-checkbox__title">Select your position</h3>
        {isLoading ? (
          <Preloader />
        ) : (
          positions.map((position) => (
            <label key={position.id} className="item-checkbox__label">
              <input
                type="radio"
                name="position"
                value={position.id}
                onChange={handlePositionChange}
                checked={position.isSelected}
              />
              <span>{position.name}</span>
            </label>
          ))
        )}
      </div>

      <div className="form__item">
        {photoError && <span className="form__error">{photoError}</span>}
        <div className={photoError ? 'form__image _error' : 'form__image'}>
          <label>
            <input onChange={handlePhotoChange} type="file" accept="image/jpeg,image/jpg" hidden />

            <span className={photoError ? '_error' : ''}>
              Upload your photo
              {photo && <img src={URL.createObjectURL(photo)} alt="Avatar" />}
            </span>
          </label>
        </div>
      </div>

      <div className="form__actions">
        {isPendingRequest ? (
          <Preloader />
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className={formValid ? 'form__button button' : 'form__button button _disabled'}
            disabled={!formValid}
          >
            Sign Up
          </button>
        )}
      </div>
    </form>
  );
};
