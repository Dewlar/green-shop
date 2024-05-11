import React, { useEffect, useState } from 'react';
import MyInput from '../../components/signup/input';
import MyLabel from '../../components/signup/label';
import { TypeOfInputs } from '../../models';
import regulars from '../../components/signup/regExp';

const SignupForm = () => {
  const [storage, setStorage] = useState(['', '']);
  const [dataDirty, setDataDirty] = useState([false, false]);
  const [dataError, setDataError] = useState(['Please enter your email', 'Please enter your password']);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const even = (element: string) => element.length !== 0;
    if (dataError.some(even)) {
      console.log('!!!!!');
      setFormValid(false);
    } else {
      console.log('&&&&&&');
      setFormValid(true);
    }
  }, dataError);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = e.target.name;
    const typeOfRegular = regulars[inputType as keyof TypeOfInputs];
    const indexOfProp = Object.keys(regulars).indexOf(inputType as keyof TypeOfInputs);

    const storageItems = [...storage];
    storageItems[indexOfProp] = e.target.value;
    setStorage(storageItems);
    const errorItems = [...dataError];

    if (!typeOfRegular.test(String(e.target.value))) {
      errorItems[indexOfProp] = `Invalid ${inputType}`;
      if (!e.target.value) {
        errorItems[indexOfProp] = `${inputType} is empty`;
      }
    } else {
      errorItems[indexOfProp] = '';
    }
    console.log(e.target.value);
    setDataError(errorItems);
  };

  const blur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const dirtyItems = [...dataDirty];
    dirtyItems[Object.keys(regulars).indexOf(e.target.name as keyof TypeOfInputs)] = true;
    setDataDirty(dirtyItems);
  };

  return (
    <div className="signUpFormWrapper">
      <h1>its signup-form layout</h1>
      <form className="signUpForm">
        <MyInput className="firstNameInput" name="firstName" type="text" placeholder="Enter your name" />
        <MyInput className="lastNameInput" name="lastName" type="text" placeholder="Enter your surname" />
        <MyInput className="country" name="country" type="text" placeholder="Enter your country" />
        <MyInput className="town" name="town" type="text" placeholder="Enter your town/city" />
        <MyInput className="address" name="address" type="text" placeholder="Enter your address" />
        <div className="inputWrapper">
          <MyLabel htmlFor="email">Email</MyLabel>
          {dataDirty[0] && dataError[0] && <div style={{ color: 'red' }}>{dataError[0]}</div>}
          <MyInput
            onBlur={(e) => blur(e)}
            onChange={(e) => handler(e)}
            className="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={storage[0]}
            id="email"
          />
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="password">Password</MyLabel>
          {dataDirty[1] && dataError[1] && <div style={{ color: 'red' }}>{dataError[1]}</div>}
          <MyInput
            onBlur={(e) => blur(e)}
            onChange={(e) => handler(e)}
            className="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={storage[1]}
            id="password"
          />
        </div>
        <MyInput className="zip" name="zip" type="number" placeholder="Enter your zip" />
        <MyInput className="phone" name="phone" type="tel" placeholder="Enter your phone number" />
        <button disabled={!formValid} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
