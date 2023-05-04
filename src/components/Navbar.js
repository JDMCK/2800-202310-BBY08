import { useNavigate } from 'react-router-dom';
import backArrowIcon from '../img/back_arrow.png';


const Navbar = ({ title, backArrow = false, navButtons = [] }) => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  if (!!backArrow + navButtons.length > 2)
    throw new Error('A maximum two buttons are allowed in Navbar (including the back arrow).');

  return (
    <nav>
      {backArrow ? <>
        <button className='left-nav' onClick={goBack}>
          <img src={backArrowIcon} alt='Back' />
        </button>
        <h1>{title}</h1>
      </> :
        <h1 className='left-nav'>{title}</h1>}
      <ul className='right-nav'>
        {navButtons[0] &&
          <li>
            <button onClick={navButtons[0].onclick}>
              <img src={navButtons[0].icon} alt='icon' />
            </button>
          </li>
        }
        {navButtons[1] &&
          <li>
            <button onClick={navButtons[1].onclick}>
              <img src={navButtons[1].icon} alt='icon' />
            </button>
          </li>
        }
      </ul>
    </nav>
  );
}

export default Navbar;