import React, { FC } from 'react';
import { classNames } from '../../models';

interface IEdit {
  isEdit: boolean;
}

const ButtonEditUpdate: FC<IEdit> = ({ isEdit }) => {
  return (
    <button
      type="submit"
      className={classNames(
        isEdit ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-400 hover:bg-amber-500',
        'min-w-36 col-span-1 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-none'
      )}
    >
      {isEdit ? 'Edit' : 'Update'}
    </button>
  );
};

export default ButtonEditUpdate;
