import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import scrollIcon from '../img/scroll.png';
import searchIcon from '../img/search.png';
import Marketplace from "../components/Marketplace";

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
      <Marketplace/>
    </>
  );
}

export default Home;