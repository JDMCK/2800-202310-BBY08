import { Navigate, Outlet } from "react-router"
import { auth } from "../config/firebase";

const PrivateWrapper = () => {
  return auth.currentUser ? <Outlet /> : <Navigate to='/signup' />;
}

export default PrivateWrapper