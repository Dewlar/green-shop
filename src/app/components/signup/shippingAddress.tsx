import React from 'react';

const setShippingAddress = (
  e: React.ChangeEvent<HTMLInputElement>,
  storage: Array<string>,
  setStr: React.Dispatch<React.SetStateAction<string[]>>,
  dataE: Array<string>,
  setDataE: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const storageItems = [...storage];
  const errorItems = [...dataE];
  const shippingElement = document.querySelector<HTMLInputElement>('.shippingAddress7');
  shippingElement?.toggleAttribute('disabled');
  shippingElement?.classList.toggle('shippingAddress');
  if (shippingElement?.classList.contains('shippingAddress')) {
    storageItems[7] = '';
    setStr(storageItems);
    e.target.value = '';
    errorItems[7] = '';
  } else {
    errorItems[7] = `Invalid shipping address`;
    if (!e.target.value) {
      errorItems[7] = `Shipping address is empty`;
    }
  }
  setDataE(errorItems);
};

export default setShippingAddress;
