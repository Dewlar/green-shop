import React, { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../state/state-context';

type Props = { redirectPath: string; children: ReactNode };

const RouteGuard: FC<Props> = ({ redirectPath = '/', children }) => {
  const { isAuth } = useStateContext();

  // if (auth.get.isAuth) {
  //   return <Navigate to={redirectPath} />;
  // }

  return isAuth ? <Navigate to={redirectPath} /> : children || <Outlet />;
};

export default RouteGuard;
