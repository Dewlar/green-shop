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

  const shippingCountry = document.querySelector<HTMLSelectElement>('.shippingCountry');
  const shippingCity = document.querySelector<HTMLInputElement>('.shippingCity');
  const shippingStreet = document.querySelector<HTMLInputElement>('.shippingStreet');
  const shippingZip = document.querySelector<HTMLInputElement>('.shippingZip');

  const shippingElement = [shippingCountry, shippingCity, shippingStreet, shippingZip];
  const shippingArray = ['shippingCountry7', 'shippingCity8', 'shippingStreet9', 'shippingZip10'];
  const errorPlease = [
    'Please enter your shipping country',
    'Please enter your shipping city',
    'Please enter your shipping street',
    'Please enter your shipping zip',
  ];
  const indexesOfInputs = [7, 8, 9, 10];
  shippingElement.forEach((item, index) => {
    item!.toggleAttribute('disabled');
    item!.classList.toggle(shippingArray[index]);
    if (item?.hasAttribute('disabled')) {
      errorItems[indexesOfInputs[index]] = '';
      setDataE(errorItems);
      storageItems[indexesOfInputs[index]] = '';
      if (indexesOfInputs[index] === 7) {
        shippingCountry!.value = '';
      }
      setStr(storageItems);
      e.target.value = '';
    } else {
      errorItems[indexesOfInputs[index]] = errorPlease[index];
      setDataE(errorItems);
    }
  });
};

export default setShippingAddress;
