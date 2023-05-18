import { Routes, Route } from 'react-router-dom';
import {
  Home, Profile, SignUp, LogIn, ResetPassword, Groups, Error404, Chat,
  Trades, AddItem, Item, Settings, Preview, PrivateWrapper, Conversations,
  OG
} from "./pages";

const App = () => {

  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path='/' element={<Home />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/addItem' element={<AddItem />} />
        <Route path='/addItem/preview' element={<Preview />} />
        <Route path='/trades' element={<Trades />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/item' element={<Item />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/conversations' element={<Conversations />} />
        <Route path='/chat' element={<Chat />} />
      </Route>
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/og' element={<OG />} />
      <Route path='/*' element={<Error404 />} />
    </Routes>
  );
};

export default App;
