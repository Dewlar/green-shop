import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import getEndpoints from './connect/getInfo';

const pressSubmit = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  storage: Array<string>,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  getEndpoints(storage);
  navigate('/');
};

export default pressSubmit;
