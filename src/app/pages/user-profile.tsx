import React from 'react';
import { useStateContext } from '../state/state-context';

const UserProfile = () => {
  const { customerData } = useStateContext();
  console.log(customerData);
  return (
    <div>
      <h1>its a user profile page</h1>
    </div>
  );
};

export default UserProfile;
