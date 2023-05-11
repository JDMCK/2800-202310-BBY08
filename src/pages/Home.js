import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import Marketplace from "../components/Marketplace";
import { scrollIcon, searchIcon } from "../img";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        title="BarterBetter"
        navButtons={[
          {
            icon: searchIcon,
            onclick: () => {
              navigate("/");
            },
          },
          {
            icon: scrollIcon,
            onclick: () => {
              navigate("/");
            },
          },
        ]}
      />
      <h1>HOME</h1>
      <Link to={"/profile"}>Profile</Link>
      <Marketplace />
      <Footer />
    </>
  );
};

export default Home;
