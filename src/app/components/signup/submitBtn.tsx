import getEndpoints from './connect/getInfo';

const pressSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, storage: Array<string>) => {
  e.preventDefault();
  getEndpoints(storage);
};

export default pressSubmit;
