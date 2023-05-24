import { Link } from 'react-router-dom';
import { Navbar } from "../components";
import { gif404, logo } from "../img";

const Error404 = () => {
  return (

    <>
    <div id="errorFeed">
            <Navbar
        title={<img src={logo} alt='BarterBetter' className='nav-logo'/>}
          navButtons={[

          ]}
        />
      <div id="errorContainer">
      <h3>Page not found...</h3>
      <img src={gif404} alt='404'></img>
      <Link to={'/'}>Go Home</Link>
      </div>
      </div>
    </>
  );
}

export default Error404;