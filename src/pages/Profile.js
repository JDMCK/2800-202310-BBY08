import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar title='Profile' backArrow={true} />
      <h1>Profile</h1>
      <Link to="/">Home</Link>
    </>
  );
}

export default Profile;