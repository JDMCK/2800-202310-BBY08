import { Routes, Route } from "react-router-dom";
import { Home, Profile, Groups, Trades, AddItem, Item, Settings } from './pages';
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
        <Route path='/item/:id' element={<Item />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;