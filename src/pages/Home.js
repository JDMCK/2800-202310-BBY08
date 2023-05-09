import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from '../components';
import { scrollIcon, searchIcon } from '../img';

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar title='BarterBetter' navButtons={[
        {
          icon: searchIcon,
          onclick: () => {
            navigate('/');
          }
        },
        {
          icon: scrollIcon,
          onclick: () => {
            navigate('/');
          }
        }]} />
      <h1>HOME</h1>
      <Link to={'/profile'}>Profile</Link>
      <Footer />
    </>
  );
}

export default Home;