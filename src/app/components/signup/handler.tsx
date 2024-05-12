import { TypeOfInputs } from '../../models/interfaces';
import isOlderThan13 from './checkDate';
import regulars from './regExp';

const handler = (
  e: React.ChangeEvent<HTMLInputElement>,
  storage: Array<string>,
  setStorage: React.Dispatch<React.SetStateAction<string[]>>,
  dataE: Array<string>,
  setDataE: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const inputType = e.target.name;
  const typeOfRegular = regulars[inputType as keyof TypeOfInputs];
  const indexOfProp = Object.keys(regulars).indexOf(inputType as keyof TypeOfInputs);

  const storageItems = [...storage];
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
  } else if (!typeOfRegular.test(String(e.target.value))) {
    errorItems[indexOfProp] = `Invalid ${inputType}`;
    if (!e.target.value) {
      errorItems[indexOfProp] = `${inputType[0].toUpperCase() + inputType.slice(1)} is empty`;
    }
  } else {
    errorItems[indexOfProp] = '';
  }
  setDataE(errorItems);
};

export default handler;
