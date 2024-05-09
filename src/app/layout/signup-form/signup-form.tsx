import React, { useEffect, useState } from 'react';
import MyInput from '../../components/signup/input';
import MyLabel from '../../components/signup/label';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passDirty, setPassDirty] = useState(false);
  const [emailError, setEmailError] = useState('Please enter your email');
  const [passError, setPassError] = useState('Please enter your password');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passError]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regular =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regular.test(String(e.target.value).toLowerCase())) {
      console.log('fsdfsdf');
      setEmailError('Invalid email');
      if (!e.target.value) {
        setEmailError('Email is empty');
      }
    } else {
      setEmailError('');
    }
  };

  const passHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!reg.test(String(e.target.value))) {
      console.log(reg.test(String(e.target.value).toLowerCase()));
      console.log('dsfsdf');
      setPassError('Invalid password');
    } else {
      setPassError('');
    }
  };

  const blur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPassDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="signUpFormWrapper">
      <h1>its signup-form layout</h1>
      <form className="signUpForm">
        <MyInput className="firstNameInput" name="firstName" type="text" placeholder="Enter your name" />
        <MyInput className="lastNameInput" name="lastName" type="text" placeholder="Enter your surname" />
        <MyInput className="country" name="country" type="text" placeholder="Enter your country" />
        <MyInput className="town" name="town" type="text" placeholder="Enter your town/city" />
        <MyInput className="address" name="address" type="text" placeholder="Enter your address" />
        <div className="inputWrapper">
          <MyLabel htmlFor="email">Email</MyLabel>
          {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          <MyInput
            onBlur={(e) => blur(e)}
            onChange={(e) => emailHandler(e)}
            className="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            id="email"
          />
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="password">Password</MyLabel>
          {passDirty && passError && <div style={{ color: 'red' }}>{passError}</div>}
          <MyInput
            onBlur={(e) => blur(e)}
            onChange={(e) => passHandler(e)}
            className="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            id="password"
          />
        </div>
        <MyInput className="zip" name="zip" type="number" placeholder="Enter your zip" />
        <MyInput className="phone" name="phone" type="tel" placeholder="Enter your phone number" />
        <button disabled={!formValid} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
