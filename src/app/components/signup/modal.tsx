import React from 'react';
import { ModalError } from '../../models';

const MyModal = ({ className, errorText }: ModalError) => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const modal = document.querySelector<HTMLElement>(`.${className}`);
    modal!.style.display = 'none';
  };
  console.log('$$$$$$$');

  return (
    <div className={className}>
      <div className="modalError">Error</div>
      <div className="modalText">{errorText}</div>
      <button className="ok" onClick={(e) => handleClose(e)}>
        OK
      </button>
    </div>
  );
};

export default MyModal;
