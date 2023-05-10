import { Routes, Route } from "react-router-dom";
import { Home, Profile, SignUp, LogIn } from './pages';
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;