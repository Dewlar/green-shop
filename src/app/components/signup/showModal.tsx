export const showErrorModal = (errorText: string) => {
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modalTextError');
  modal!.style.display = 'flex';
  modalText!.innerHTML = errorText;
};

export const showSuccessModal = (text: string) => {
  const modal = document.getElementById('modalSuccess');
  const modalText = document.getElementById('modalTextSuccess');
  modal!.style.display = 'flex';
  modalText!.innerHTML = text;
};
