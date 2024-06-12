// import React from 'react';
// import getEndpoints from './connect/getInfo';
// import { showSuccessModal } from './showModal';
import { FieldValues, SubmitHandler } from 'react-hook-form';
// import { StorageType } from '../../models';

const pressSubmit: SubmitHandler<FieldValues> = (storage) => {
  console.log(storage);
  // getEndpoints(storage).then(() => {
  //   const modalText = document.getElementById('modalTextError');
  //   if (modalText?.innerHTML === '') {
  //     showSuccessModal('Great! You are registered');
  //   }
  // });
};

export default pressSubmit;
