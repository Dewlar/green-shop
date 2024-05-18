import React from 'react';

const MyBtn = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <button {...props}></button>;
};

export default MyBtn;
