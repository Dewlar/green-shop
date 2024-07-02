import React, { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = { redirectPath: string; isRedirect: boolean; children: ReactNode };

const RouteGuard: FC<Props> = ({ redirectPath = '/', isRedirect, children }) => {
  return isRedirect ? <Navigate to={redirectPath} /> : children || <Outlet />;
};

export default RouteGuard;
