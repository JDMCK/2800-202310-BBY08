import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components";
import { gif404, logo } from "../img";

const Error404 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  return (

    <>
      <div id="error-feed">
        <Navbar
          title={<img src={logo} alt='BarterBetter' className='nav-logo' />}
        />
        <div id="error-container">
          <h3>Page not found...</h3>
          <img src={gif404} alt='404'></img>
          <div className='go-home-container'>
            <button id='go-home' onClick={goHome}>Go Home</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;