import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Preloader } from '../components/Preloader';

import { getPositions, getMeToken, registerUser } from '../redux/slices/auth/authSlice';

export const Form = () => {
  const dispatch = useDispatch();

  const { positions, token, isLoading, isPendingRequest } = useSelector((state) => state.auth);

  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  const [userNameError, setUserNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [photoError, setPhotoError] = React.useState('');
  const [positionError, setPositionError] = React.useState('');

  const [formValid, setFormValid] = React.useState(false);

  const handleNameChange = (e) => {
    const userName = e.target.value;
    setUserName(userName);

    if (!/^[A-Za-z]{2}[A-Za-z\s]*$/.test(userName)) {
      setUserNameError('Username should contain only Latin characters');
    } else if (userName.length < 2 || userName.length > 60) {
      setUserNameError('Username should be 2-60 characters');
    } else if (!/^[A-Z]/.test(userName)) {
      setUserNameError('Username should start with a capital letter');
    } else {
      setUserNameError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailPattern =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if (!emailPattern.test(e.target.value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (!/^(\+380)\d{9}$/.test(e.target.value)) {
      setPhoneError('Phone number should start with +380');
    } else {
      setPhoneError('');
    }
  };

  const handlePositionChange = (e) => {
    const selectedPositionId = e.target.value;

    if (selectedPositionId) {
      setPositionError('');
      setPosition(selectedPositionId);
    } else {
      setPositionError('Please select a position');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width < 70 || image.height < 70) {
          setPhotoError('Minimum size of photo should be 70x70px');
        } else if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
          setPhotoError('Photo format should be JPEG/JPG');
        } else if (file.size > 5 * 1024 * 1024) {
          setPhotoError('Photo size must not exceed 5MB');
        } else {
          setPhotoError('');
          setPhoto(file);
        }
      };
    }
  };

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
        <label htmlFor="phone" className="form__lable">
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
