import React from 'react';

const MyLabel = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLLabelElement> &
    React.LabelHTMLAttributes<HTMLLabelElement>
) => {
  return <label {...props}></label>;
};

export default MyLabel;
