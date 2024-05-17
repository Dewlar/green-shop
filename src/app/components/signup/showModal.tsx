const showErrorModal = (errorText: string) => {
  const modal = document.querySelector<HTMLElement>('.modal');
  const modalText = document.querySelector<HTMLElement>('.modalText');
  modal!.style.display = 'flex';
  modalText!.innerHTML = errorText;
};

export default showErrorModal;
