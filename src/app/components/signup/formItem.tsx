import React from 'react';
import MyLabel from './label';
import MyInput from './input';
import { TypeItem } from '../../models';
import regulars from './regExp';
import MySelect from './select';

function MyItem({ prop, type, index, dataD, dataE, stor, setData, setStor, setDataE, onB, onC }: TypeItem) {
  return (
    <div className="inputWrapper">
      <MyLabel htmlFor={prop}>{prop[0].toUpperCase() + prop.slice(1)}</MyLabel>
      {index === 3 ? (
        <MySelect
          className={prop}
          id={prop}
          name={prop}
          onBlur={(e) => onB(e, regulars, dataD, setData)}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onC(e, stor, setStor, dataE, setDataE)}
        ></MySelect>
      ) : (
        <MyInput
          onBlur={(e) => onB(e, regulars, dataD, setData)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onC(e, stor, setStor, dataE, setDataE)}
          className={prop}
          name={prop}
          type={type}
          placeholder={`Enter your ${prop}`}
          value={stor[index]}
          id={prop}
        />
      )}
      {dataD[index] && dataE[index] && <div style={{ color: 'red' }}>{dataE[index]}</div>}
    </div>
  );
}

export default MyItem;
