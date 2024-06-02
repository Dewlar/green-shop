import { TypeOfInputs, CountryEnum } from '../../models';
import isOlderThan13 from './checkDate';
import { regulars, regularsZip } from './regExp';
import { setErrorStyle, removeErrorStyle } from './setErrorStyle';

const handler = (
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  storage: Array<string>,
  setStorage: React.Dispatch<React.SetStateAction<string[]>>,
  dataE: Array<string>,
  setDataE: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const storageItems = [...storage];
  const inputType = e.target.name;
  const typeOfRegular = regulars[inputType as keyof TypeOfInputs];
  const indexOfProp = Object.keys(regulars).indexOf(inputType as keyof TypeOfInputs);
  storageItems[indexOfProp] = e.target.value;
  setStorage(storageItems);
  const errorItems = [...dataE];
  if (e.target.name === 'birth') {
    if (!isOlderThan13(e.target.value)) {
      setErrorStyle(e);
      errorItems[indexOfProp] = `Invalid birth date`;
    } else {
      removeErrorStyle(e);
      errorItems[indexOfProp] = '';
    }
  } else if ((e.target.name === 'zip' && storage[3] === '') || (e.target.name === 'shippingZip' && storage[7] === '')) {
    if (e.target.name === 'zip' && storage[3] === '') {
      errorItems[indexOfProp] = 'Please choose country';
    } else if (e.target.name === 'shippingZip' && storage[7] === '') {
      errorItems[indexOfProp] = 'Please choose shipping country';
    }
  } else if (e.target.name === 'country' || e.target.name === 'shippingCountry') {
    if (e.target.value.length === 0) {
      setErrorStyle(e);
      errorItems[indexOfProp] = `Country is empty`;
    } else {
      const country = CountryEnum[e.target.value as keyof typeof CountryEnum];
      const countryWithFormat = country![0].toLowerCase() + country!.slice(1);
      const regularOfCountryZip = regularsZip[countryWithFormat];
      if (e.target.name === 'country') {
        regulars.zip = regularOfCountryZip;
      } else {
        regulars.shippingZip = regularOfCountryZip;
      }
      removeErrorStyle(e);
      errorItems[indexOfProp] = '';
    }
  } else if (!typeOfRegular.test(String(e.target.value))) {
    errorItems[indexOfProp] = `Invalid ${inputType.replace(/([A-Z])/g, function replace(match) {
      return ` ${match.toLowerCase()}`;
    })}`;
    if (!e.target.value) {
      errorItems[indexOfProp] = `${inputType[0].toUpperCase()}${inputType
        .replace(/([A-Z])/g, function replace(match) {
          return ` ${match.toLowerCase()}`;
        })
        .slice(1)} is empty`;
    }
    setErrorStyle(e);
  } else {
    removeErrorStyle(e);
    errorItems[indexOfProp] = '';
  }
  setDataE(errorItems);
};

export default handler;
