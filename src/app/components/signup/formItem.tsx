import React from 'react';
import MyLabel from './label';
import MyInput from './input';
import { TypeItem } from '../../models';
import regulars from './regExp';
import MySelect from './select';

function MyItem({ prop, type, index, dataD, dataE, stor, setData, setStor, setDataE, onB, onC }: TypeItem) {
  return (
    <div className="inputWrapper">
      <MyLabel htmlFor={prop}>
        {prop[0].toUpperCase() +
          prop
            .split(/(?=[A-Z])/)
            .join(' ')
            .slice(1)}
      </MyLabel>
      {index === 3 || index === 7 ? (
        <MySelect
          className={`${prop} ${prop}${index}`}
          id={prop}
          name={prop}
          onBlur={(e) => onB(e, regulars, dataD, setData, dataE)}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onC(e, stor, setStor, dataE, setDataE)}
          disabled={index === 7}
        ></MySelect>
      ) : (
        <MyInput
          onBlur={(e) => onB(e, regulars, dataD, setData, dataE)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onC(e, stor, setStor, dataE, setDataE)}
          className={`${prop} ${prop}${index}`}
          name={prop}
          type={type}
          placeholder={`Enter your ${prop.replace(/([A-Z])/g, function replace(match) {
            return ` ${match.toLowerCase()}`;
          })}`}
          value={stor[index]}
          id={prop}
          disabled={index === 8 || index === 9 || index === 10}
        />
      )}
      {dataD[index] && dataE[index] && <div style={{ color: 'red' }}>{dataE[index]}</div>}
    </div>
  );
}

export default MyItem;
