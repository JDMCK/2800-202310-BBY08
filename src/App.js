import { Routes, Route } from "react-router-dom";
import {
  Home,
  Profile,
  SignUp,
  LogIn,
  ResetPassword,
  Groups,
  Trades,
  AddItem,
  Preview,
} from "./pages";
import AuthProvider from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/addItem/preview" element={<Preview />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
