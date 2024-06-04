import React, { FC } from 'react';
import { classNames } from '../../models';

interface IEdit {
  isEdit: boolean;
  isNew?: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonEditUpdate: FC<IEdit> = ({ isEdit, isNew, setIsEdit }) => {
  const getButtonName = () => {
    if (isNew) return isEdit ? 'Edit' : 'Save';
    return isEdit ? 'Edit' : 'Update';
  };

  const changeEditableStatus = () => {
    console.log('changeEditableStatus');
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <button
      type="submit"
      onClick={changeEditableStatus}
      className={classNames(
        isEdit ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-400 hover:bg-amber-500',
        'min-w-36 col-span-1 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-none'
      )}
    >
      {getButtonName()}
    </button>
  );
};

export default ButtonEditUpdate;
