import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ redirectPath = '/login', isAllowed }) => {
  if (isAllowed == 'Empty') {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <Outlet />;
};
