import { Navbar, Footer } from "../components";
import { useReadStorage } from "../hooks";

const Profile = () => {

  const { downloadURL, isPending, error } = useReadStorage('/example_profile_picture.png');

  return (
    <>
      <Navbar title='Profile' />
      <img src={downloadURL} alt='profile' />
      <Footer />
    </>
  );
}

export default Profile;