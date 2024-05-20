import React from 'react';

const MyInput = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>
) => {
  return <input {...props} />;
};

export default MyInput;
