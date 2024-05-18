import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyItem from '../../components/signup/formItem';
import inputTypes from '../../components/signup/inputTypes';
import blurHandler from '../../components/signup/blur';
import handler from '../../components/signup/handler';
import pressSubmit from '../../components/signup/submitBtn';
import MyBtn from '../../components/signup/btn';
import MyInput from '../../components/signup/input';
import MyLabel from '../../components/signup/label';
import setDefaultAddress from '../../components/signup/defaultAddress';
import setShippingAddress from '../../components/signup/shippingAddress';
import MyModal from '../../components/signup/modal';
// import MyModal from '../../components/signup/modal';

const SignupForm = () => {
  const navigate = useNavigate();
  const [storage, setStorage] = useState(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  const [dataDirty, setDataDirty] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [dataError, setDataError] = useState([
    'Please enter your name',
    'Please enter your surname',
    'Please enter your birth date',
    'Please enter your country',
    'Please enter your town/city',
    'Please enter your street',
    'Please enter your zip',
    '',
    '',
    '',
    '',
    'Please enter your email',
    'Please enter your password',
  ]);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const even = (element: string) => element.length !== 0;
    if (dataError.some(even)) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, dataError);

  return (
    <div className="signUpFormWrapper">
      <form className="signUpForm" action="/">
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
        <div className="flex absolute justify-between h-fit w-fit right-0 bottom-14">
          <MyLabel className="text-xs w-fit mr-5 h-fit">Set Address as default</MyLabel>
          <MyInput
            type={'checkbox'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefaultAddress(e, storage, setStorage)}
          ></MyInput>
        </div>
        <div className="flex absolute justify-between w-fit h-fit right-0 bottom-8">
          <MyLabel className="text-xs w-fit mr-5 h-fit">Add Shipping address</MyLabel>
          <MyInput
            className="setShipping"
            type={'checkbox'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setShippingAddress(e, storage, setStorage, dataError, setDataError)
            }
          ></MyInput>
        </div>
        <MyBtn
          disabled={!formValid}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => pressSubmit(e, storage)}
          type="submit"
          className="submitRegistration"
        >
          Registration
        </MyBtn>
        <MyModal className="modal" classText="modalTextError" errorText="" type="Error"></MyModal>
        <MyModal
          className="modalSuccess"
          classText="modalTextSuccess"
          errorText=""
          type="Success"
          redirect={navigate}
        ></MyModal>
      </form>
    </div>
  );
};

export default SignupForm;
