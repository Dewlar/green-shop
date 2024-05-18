export const setErrorStyle = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  const changeElement = event.target;
  changeElement.style.border = '1px solid red';
};

export const removeErrorStyle = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  const changeElement = event.target;
  changeElement.classList.remove('border-red-500');
  changeElement.style.border = '1px solid #6b7280';
};
