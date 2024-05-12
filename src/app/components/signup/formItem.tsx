import React from 'react';
import MyLabel from './label';
import MyInput from './input';
import { TypeItem } from '../../models';

function MyItem({ prop, type, index, dataD, dataE, stor, onB, onC }: TypeItem) {
  return (
    <div className="inputWrapper">
      <MyLabel htmlFor={prop}>{prop[0].toUpperCase() + prop.slice(1)}</MyLabel>
      {dataD[index] && dataE[index] && <div style={{ color: 'red' }}>{dataE[index]}</div>}
      <MyInput
        onBlur={(e) => onB(e)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onC(e)}
        className={prop}
        name={prop}
        type={type}
        placeholder={`Enter your${prop}`}
        value={stor[index]}
        id="email"
      />
    </div>
  );
}

export default MyItem;
