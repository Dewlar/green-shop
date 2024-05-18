import React from 'react';
import getEndpoints from './connect/getInfo';
import { showSuccessModal } from './showModal';

const pressSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, storage: Array<string>) => {
  e.preventDefault();
  getEndpoints(storage).then(() => {
    const modalText = document.getElementById('modalTextError');
    console.log(modalText);
    if (modalText?.innerHTML === '') {
      showSuccessModal('Great! You are registered');
    }
  });
};

export default pressSubmit;
