import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../layout/signup-form/signup-form';

const Signup = () => {
  return (
    <div>
      <SignupForm></SignupForm>
      <Link to="/login" className="absolute top-10 right-10 h-16 w-16 cursor-pointer">
        Log In
      </Link>
    </div>
  );
};

export default Signup;
