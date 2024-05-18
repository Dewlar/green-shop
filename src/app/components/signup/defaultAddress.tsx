import React from 'react';

const setDefaultAddress = (
  e: React.ChangeEvent<HTMLInputElement>,
  storage: Array<string>,
  setStr: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const storageItems = [...storage];
  if (e.target.checked === true) {
    storageItems[13] = '0';
    storageItems[14] = '1';
  } else {
    storageItems[13] = '';
    storageItems[14] = '';
  }
  setStr(storageItems);
};

export default setDefaultAddress;
