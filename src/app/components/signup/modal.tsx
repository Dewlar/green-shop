import React from 'react';
import { ModalError } from '../../models';

const MyModal = ({ className, classText, errorText, type, redirect }: ModalError) => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const modal = document.getElementById(`${className}`);
    modal!.style.display = 'none';
    if (type === 'Success') {
      redirect!('/');
    }
  };

  return (
    <div className={className}>
      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert" id={className}>
        <p className="font-bold">{type}</p>
        <p id={classText}>{errorText}</p>
        <button className="ok" onClick={(e) => handleClose(e)}>
          OK
        </button>
      </div>
    </div>
  );
};

export default MyModal;
