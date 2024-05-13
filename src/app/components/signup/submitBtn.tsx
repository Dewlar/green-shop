import getEndpoints from './connect/getInfo';

const pressSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, storage: Array<string>) => {
  e.preventDefault();
  console.log(storage);
  getEndpoints(storage[0], storage[1], storage[8], storage[9]);
};

export default pressSubmit;
