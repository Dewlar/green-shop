const showErrorModal = (errorText: string) => {
  const modal = document.getElementById('modal');
  console.log(modal);
  const modalText = document.getElementById('modalText');
  console.log(modalText);
  modal!.style.display = 'flex';
  modalText!.innerHTML = errorText;
};

export default showErrorModal;
