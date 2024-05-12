import React, { useEffect, useState } from 'react';
import { TypeOfInputs } from '../../models';
import regulars from '../../components/signup/regExp';
import MyItem from '../../components/signup/formItem';

const SignupForm = () => {
  const [storage, setStorage] = useState(['', '', '', '', '', '', '', '']);
  const [dataDirty, setDataDirty] = useState([false, false, false, false, false, false, false, false]);
  const [dataError, setDataError] = useState([
    'Enter your name',
    'Enter your surname',
    'Enter your country',
    'Enter your town/city',
    'Enter your address',
    'Please enter your email',
    'Please enter your password',
    'Enter your zip',
    'Enter your phone number',
  ]);
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
        errorItems[indexOfProp] = `${inputType[0].toUpperCase() + inputType.slice(1)} is empty`;
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
        {/* <MyInput className="firstNameInput" name="firstName" type="text" placeholder="Enter your name" /> */}
        <MyItem
          prop={'name'}
          type={'text'}
          index={0}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        {/* <MyInput className="lastNameInput" name="lastName" type="text" placeholder="Enter your surname" /> */}
        <MyItem
          prop={'surname'}
          type={'text'}
          index={1}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        <MyItem
          prop={'birth'}
          type={'date'}
          index={2}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        {/* <MyInput className="country" name="country" type="text" placeholder="Enter your country" /> */}
        <MyItem
          prop={'country'}
          type={'text'}
          index={3}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        {/* <MyInput className="town" name="town" type="text" placeholder="Enter your town/city" /> */}
        <MyItem
          prop={'city'}
          type={'text'}
          index={4}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        {/* <MyInput className="address" name="address" type="text" placeholder="Enter your address" /> */}
        <MyItem
          prop={'address'}
          type={'text'}
          index={5}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        <MyItem
          prop={'email'}
          type={'email'}
          index={6}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        <MyItem
          prop={'password'}
          type={'password'}
          index={7}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        {/* <MyInput className="zip" name="zip" type="number" placeholder="Enter your zip" /> */}
        <MyItem
          prop={'zip'}
          type={'number'}
          index={8}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        {/* <MyInput className="phone" name="phone" type="tel" placeholder="Enter your phone number" /> */}
        <MyItem
          prop={'number'}
          type={'tel'}
          index={9}
          dataD={dataDirty}
          dataE={dataError}
          stor={storage}
          onB={blur}
          onC={handler}
        ></MyItem>
        <button disabled={!formValid} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
