import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Preloader } from '../components/Preloader';
import { getPositions, getMeToken, registerUser } from '../redux/slices/auth/authSlice';

import useForm from '../hooks/useForm';

export const Form = () => {
  const dispatch = useDispatch();

  const [isNameFocused, setIsNameFocused] = React.useState(false);
  const [isEmailFocused, setIsEmailFocused] = React.useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = React.useState(false);

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
          id="name"
          type="text"
          value={userName}
          onChange={handleNameChange}
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
          className={userNameError ? 'form__input _error' : 'form__input'}
          autoComplete="none"
        />
        <label
          htmlFor="name"
          className={`form__label ${isNameFocused || userName ? '_focused' : ''} ${
            userNameError ? '_error' : ''
          }`}
        >
          Your name
        </label>
      </div>
      <div className="form__item">
        {emailError && <span className="form__error">{emailError}</span>}
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          className={emailError ? 'form__input _error' : 'form__input'}
          autoComplete="none"
        />
        <label
          htmlFor="email"
          className={`form__label ${isEmailFocused || email ? '_focused' : ''} ${
            emailError ? '_error' : ''
          }`}
        >
          Email
        </label>
      </div>

      <div className="form__item">
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onFocus={() => setIsPhoneFocused(true)}
          onBlur={() => setIsPhoneFocused(false)}
          className={phoneError ? 'form__input _error' : 'form__input'}
          autoComplete="none"
        />
        <label
          htmlFor="phone"
          className={`form__label ${isPhoneFocused || phone ? '_focused' : ''} ${
            phoneError ? '_error' : ''
          }`}
        >
          Phone
        </label>
        {phoneError ? (
          <span className="form__error">{phoneError}</span>
        ) : (
          <div className="form__sub-label">+380 (XXX) XXX - XX - XX</div>
        )}
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
