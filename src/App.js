import { Routes, Route } from "react-router-dom";
import { Home, Profile, Groups, Trades, AddItem } from './pages';
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/addItem' element={<AddItem />} />
        <Route path='/trades' element={<Trades />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;