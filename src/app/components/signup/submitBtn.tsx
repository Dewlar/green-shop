import React from 'react';
// import { useNavigate } from 'react-router-dom';
import getEndpoints from './connect/getInfo';

const pressSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, storage: Array<string>) => {
  // e.preventDefault();
  // const navigate = useNavigate();
  e.preventDefault();
  getEndpoints(storage);
  // navigate('/');
};

export default pressSubmit;
