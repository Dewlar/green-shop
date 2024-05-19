import React from 'react';
import LoginForm from '../layout/login-form/login-form';
import HeaderWidthMobile from '../components/header/header-width-mobile';

const Login = () => {
  return (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
