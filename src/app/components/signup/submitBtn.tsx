import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import getEndpoints from './connect/getInfo';

const pressSubmit = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  storage: Array<string>,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  getEndpoints(storage).then((k) => console.log(k));
  if (storage[13] === '0') {
    navigate('/');
  }
};

export default pressSubmit;
