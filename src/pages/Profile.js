import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Profile = () => {
  return (
    <>
      <Navbar title='Profile' />
      <h1>Profile</h1>
      <Link to="/">Home</Link>
      <Footer />
    </>
  );
}

export default Profile;