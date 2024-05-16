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
  // const shippingString = 'shippingCountry7, shippingCity8, shippingStreet9, shippingZip10';
  const indexesOfInputs = [7, 8, 9, 10];
  console.log(shippingElement);
  shippingElement.forEach((item, index) => {
    console.log(errorItems);
    console.log(setDataE);
    item!.toggleAttribute('disabled');
    item!.classList.toggle(shippingArray[index]);
    if (item?.hasAttribute('disabled')) {
      storageItems[indexesOfInputs[index]] = '';
      if (indexesOfInputs[index] === 7) {
        shippingCountry!.value = '';
      }
      setStr(storageItems);
      e.target.value = '';
      //   errorItems[indexesOfInputs[index]] = '';
      // } else {
      //   errorItems[indexesOfInputs[index]] = `Invalid shipping address`;
      //   if (!e.target.value) {
      //     errorItems[indexesOfInputs[index]] = `Shipping address is empty`;
      //   }
      // }
      // setDataE(errorItems);
    }
  });
};

export default setShippingAddress;
