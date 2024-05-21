import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  // const navigate = useNavigate();
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
  }, [dataError]); // change dataError to [dataError]. So you need to specify an array of dependencies instead of passing values

  return (
    <div className="signUpFormWrapper items-center overflow-auto h-dvh min-h-full pt-10 pr-10 pb-10 pl-10">
      <form className="signUpForm" action="/">
        <div className="col-span-2 flex justify-between">
          <div className="w-20"></div>
          <h1 className="text-lg">Registration</h1>
          <Link
            to="/login"
            className="rounded-md select-none bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Log In
          </Link>
        </div>

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
        <div className="flex flex-col items-end justify-center gap-2">
          <div className="flex justify-between h-fit w-fit right-0 bottom-36">
            <MyLabel className="text-xs w-fit mr-5 h-fit">Set Address as default</MyLabel>
            <MyInput
              type={'checkbox'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefaultAddress(e, storage, setStorage)}
            ></MyInput>
          </div>
          <div className="flex  justify-between w-fit h-fit right-0 bottom-28">
            <MyLabel className="text-xs w-fit mr-5 h-fit">Add Shipping address</MyLabel>
            <MyInput
              className="setShipping"
              type={'checkbox'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShippingAddress(e, storage, setStorage, dataError, setDataError)
              }
            ></MyInput>
          </div>
        </div>
        <div className="flex justify-center col-span-2">
          <MyBtn
            disabled={!formValid}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => pressSubmit(e, storage)}
            type="submit"
            className="submitRegistrationselect-none disabled:bg-green-200 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Registration
          </MyBtn>
        </div>
        <MyModal
          className="modal"
          classText="modalTextError"
          errorText=""
          type="Error"
          login={storage[11]}
          password={storage[12]}
        ></MyModal>
        <MyModal
          className="modalSuccess"
          classText="modalTextSuccess"
          errorText=""
          type="Success"
          login={storage[11]}
          password={storage[12]}
          // redirect={navigate}
        ></MyModal>
      </form>
    </div>
  );
};

export default SignupForm;
