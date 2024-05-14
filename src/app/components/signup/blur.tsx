import { TypeOfInputs } from '../../models/interfaces';

const blurHandler = (
  e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLSelectElement, Element>,
  reg: TypeOfInputs,
  dataD: Array<boolean>,
  setData: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  const dirtyItems = [...dataD];
  dirtyItems[Object.keys(reg).indexOf(e.target.name as keyof TypeOfInputs)] = true;
  setData(dirtyItems);
};

export default blurHandler;
