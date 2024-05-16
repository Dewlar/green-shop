import { TypeOfInputs } from '../../models/interfaces';
import isOlderThan13 from './checkDate';
import regulars from './regExp';
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

  console.log(storageItems);
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
  } else if (e.target.name === 'country' || e.target.name === 'shippingCountry') {
    if (e.target.value.length === 0) {
      setErrorStyle(e);
      errorItems[indexOfProp] = `Country is empty`;
    } else {
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
  console.log(errorItems);
  setDataE(errorItems);
};

export default handler;
