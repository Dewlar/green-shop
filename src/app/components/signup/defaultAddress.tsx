import React from 'react';

const setDefaultAddress = (
  e: React.ChangeEvent<HTMLInputElement>,
  storage: Array<string>,
  setStr: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const storageItems = [...storage];
  if (e.target.checked === true) {
    storageItems[10] = '0';
  } else {
    storageItems[10] = '';
  }
  setStr(storageItems);
};

export default setDefaultAddress;
