import React from 'react';

const useForm = () => {
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

  const handleNameChange = (e) => {
    const userName = e.target.value;
    const userNamePattern = /^[A-Za-z]{2}[A-Za-z\s]*$/

    setUserName(userName);

    if (!userNamePattern.test(userName)) {
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
    const email = e.target.value
    const emailPattern = /^[a-z0-9]+([.-]?[a-z0-9]+)*@[a-z0-9]+([.-]?[a-z0-9]+)*(\.[a-z]{2,8})+$/;

    setEmail(email);

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    const phonePattern = /^(\+380)\d{9}$/

    setPhone(phoneNumber);
  
    if (!phonePattern.test(phoneNumber)) {
      setPhoneError('Must start with +380 and have 13 digits');
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

  return {
    userName,
    setUserName,
    email,
    setEmail,
    phone,
    setPhone,
    position,
    setPosition,
    photo,
    setPhoto,
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
  };
};

export default useForm;
