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
  const shippingCountry = document.querySelector<HTMLInputElement>('.shippingCountry7');
  const shippingCity = document.querySelector<HTMLInputElement>('.shippingCity8');
  const shippingStreet = document.querySelector<HTMLInputElement>('.shippingStreet9');
  const shippingZip = document.querySelector<HTMLInputElement>('.shippingZip10');
  const shippingElement = [shippingCountry, shippingCity, shippingStreet, shippingZip];
  const shippingArray = ['shippingCountry', 'shippingCity', 'shippingStreet', 'shippingZip'];
  const shippingString = 'shippingCountry, shippingCity, shippingStreet, shippingZip';
  const indexesOfInputs = [7, 8, 9, 10];
  shippingElement.forEach((item, index) => {
    item!.toggleAttribute('disabled');
    item!.classList.toggle(`${shippingArray[index]}`);
    if (item!.matches(shippingString)) {
      storageItems[indexesOfInputs[index]] = '';
      console.log(storageItems);
      setStr(storageItems);
      e.target.value = '';
      errorItems[indexesOfInputs[index]] = '';
    } else {
      errorItems[indexesOfInputs[index]] = `Invalid shipping address`;
      if (!e.target.value) {
        errorItems[indexesOfInputs[index]] = `Shipping address is empty`;
      }
    }
    setDataE(errorItems);
  });
};

export default setShippingAddress;
