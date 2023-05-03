import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>HOME</h1>
      <Link to={'/profile'}>Profile</Link>
    </>
  );
}

export default Home;