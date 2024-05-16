import { TypeOfInputs } from '../../models/interfaces';
import { setErrorStyle } from './setErrorStyle';

const blurHandler = (
  e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLSelectElement, Element>,
  reg: TypeOfInputs,
  dataD: Array<boolean>,
  setData: React.Dispatch<React.SetStateAction<boolean[]>>,
  dataE: Array<string>
) => {
  const dirtyItems = [...dataD];
  const index = Object.keys(reg).indexOf(e.target.name as keyof TypeOfInputs);
  console.log(dirtyItems);
  if (!dirtyItems[index] && dataE !== undefined && dataE[index] !== '') {
    setErrorStyle(e);
  }
  dirtyItems[index] = true;
  setData(dirtyItems);
};

export default blurHandler;
