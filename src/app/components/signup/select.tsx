import React from 'react';

const MySelect = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLSelectElement> &
    React.SelectHTMLAttributes<HTMLSelectElement>
) => {
  return (
    <select {...props}>
      <option value={''}>Choose your country</option>
      <option value={'DE'}>Germany</option>
      <option value={'AT'}>Austria</option>
      <option value={'NL'}>Netherlands</option>
    </select>
  );
};

export default MySelect;
