import { Routes, Route } from "react-router-dom";
import { Home, Profile } from './pages';
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <Routes>
      <AuthProvider>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </AuthProvider>
    </Routes>
  );
}

export default App;