import { TypeOfInputs } from '../../models/interfaces';
import isOlderThan13 from './checkDate';
import regulars from './regExp';

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
      errorItems[indexOfProp] = `Invalid birth date`;
    } else {
      errorItems[indexOfProp] = '';
    }
  } else if (e.target.name === 'country') {
    if (e.target.value.length === 0) {
      console.log('fsfs');
      errorItems[3] = `Country is empty`;
    } else {
      errorItems[3] = '';
    }
  } else if (!typeOfRegular.test(String(e.target.value))) {
    errorItems[indexOfProp] = `Invalid ${inputType}`;
    if (!e.target.value) {
      errorItems[indexOfProp] = `${inputType[0].toUpperCase() + inputType.slice(1)} is empty`;
    }
  } else {
    errorItems[indexOfProp] = '';
  }
  console.log(errorItems);
  setDataE(errorItems);
};

export default handler;
