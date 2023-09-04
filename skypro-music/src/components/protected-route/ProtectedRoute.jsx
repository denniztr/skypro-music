import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, redirectPath = '/signin' }) => {
  if (!localStorage.getItem('user')) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children;
};
