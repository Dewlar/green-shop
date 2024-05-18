import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import getEndpoints from './connect/getInfo';

const pressSubmit = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  storage: Array<string>,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  getEndpoints(storage).then((item) => {
    console.log(item);
    const modalText = document.querySelector('.modalText');
    if (modalText?.innerHTML === '') {
      navigate('/');
    }
  });
};

export default pressSubmit;
