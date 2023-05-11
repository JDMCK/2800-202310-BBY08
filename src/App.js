import { Routes, Route } from "react-router-dom";
import { Home, Profile, Item } from "./pages";
import AuthProvider from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
