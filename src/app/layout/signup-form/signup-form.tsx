import React, { useEffect, useState } from 'react';
import MyItem from '../../components/signup/formItem';
import inputTypes from '../../components/signup/inputTypes';
import blurHandler from '../../components/signup/blur';
import handler from '../../components/signup/handler';
import pressSubmit from '../../components/signup/submitBtn';

const SignupForm = () => {
  const [storage, setStorage] = useState(['', '', '', '', '', '', '', '', '', '']);
  const [dataDirty, setDataDirty] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [dataError, setDataError] = useState([
    'Please enter your name',
    'Please enter your surname',
    'Please enter your birth date',
    'Please enter your country',
    'Please enter your town/city',
    'Please enter your street',
    'Please enter your zip',
    'Please enter your phone number',
    'Please enter your email',
    'Please enter your password',
  ]);
  const [formValid, setFormValid] = useState(false);
  // const t = document.querySelector('.submitRegistration') as HTMLButtonElement;
  // t.addEventListener('click', pressSubmit);

  useEffect(() => {
    // document.querySelector('.submitRegistration')?.addEventListener('click', pressSubmit);
    const even = (element: string) => element.length !== 0;
    if (dataError.some(even)) {
      console.log('!!!!!');
      setFormValid(false);
    } else {
      console.log('&&&&&&');
      setFormValid(true);
    }
  }, dataError);

  return (
    <div className="signUpFormWrapper">
      <h1>its signup-form layout</h1>
      <form className="signUpForm">
        {Object.entries(inputTypes).map((type, index) => (
          <MyItem
            prop={type[0]}
            type={type[1]}
            index={index}
            dataD={dataDirty}
            dataE={dataError}
            stor={storage}
            setData={setDataDirty}
            setStor={setStorage}
            setDataE={setDataError}
            onB={blurHandler}
            onC={handler}
            key={index}
          ></MyItem>
        ))}
        <button
          disabled={!formValid}
          onClick={(e) => pressSubmit(e, storage)}
          type="submit"
          className="submitRegistration"
        >
          Registration
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
