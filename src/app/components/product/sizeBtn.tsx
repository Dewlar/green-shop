import React from 'react';
import { TypeSizeBtn, TypeSizesOrder } from '../../models';

const SizeBtn = ({ key, label, setSelectedSize, color, colorHover }: TypeSizeBtn) => {
  return (
    <div key={key}>
      <button
        className={`h-8 w-8 rounded-full ${color} ${colorHover} border border-black border-opacity-10 flex justify-center items-center`}
        onClick={(e) => {
          e.preventDefault();
          const sizeAndOrder: TypeSizesOrder = { S: 0, M: 1, L: 2 };
          setSelectedSize(sizeAndOrder[label as keyof TypeSizesOrder]);
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default SizeBtn;
