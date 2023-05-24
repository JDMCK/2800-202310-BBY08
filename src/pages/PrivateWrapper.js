import { Navigate, Outlet } from 'react-router'
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from './Loading';

const PrivateWrapper = () => {

  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;
  if (user) return <Outlet />;
  else return <Navigate to='/signup' />;

}

export default PrivateWrapper