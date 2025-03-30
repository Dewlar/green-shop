import React, { FC } from 'react';
import { classNames } from '../../models';

type Props = { isEdit: boolean };
const BubblingSideImage: FC<Props> = ({ isEdit }) => {
  return (
    <img
      className={classNames(
        isEdit ? ' rotate-90' : '',
        'hidden md:block absolute -z-10 bottom-0 -left-24 w-24 h-auto transform origin-bottom-right transition-transform duration-500'
      )}
      src="./assets/budding-pop-pictures/whats-going-on2.png"
      alt=""
    />
  );
};

export default BubblingSideImage;
