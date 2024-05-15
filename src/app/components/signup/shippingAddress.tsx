import React from 'react';

const setShippingAddress = (
  e: React.ChangeEvent<HTMLInputElement>,
  storage: Array<string>,
  setStr: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const storageItems = [...storage];
  console.log(e.target.checked);
  console.log(storageItems);
  console.log(setStr);
  //   if (e.target.checked === true) {
  //     storageItems[10] = '0';
  //   } else {
  //     storageItems[10] = '';
  //   }
  //   setStr(storageItems);
};

export default setShippingAddress;
