import { useLocation, useNavigate } from "react-router-dom";
import {
  homeIcon, homeActiveIcon, groupsIcon, groupsActiveIcon, addItemIcon,
  addItemActiveIcon, tradesIcon, tradesActiveIcon, profileIcon, profileActiveIcon
} from '../img';

const Footer = ({ text = true }) => {

  const location = useLocation();
  let active = location.pathname;

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const goGroups = () => {
    navigate('/groups');
  }

  const goAddItem = () => {
    navigate('/addItem');
  }

  const goTrades = () => {
    navigate('/trades');
  }

  const goProfile = () => {
    navigate('/profile');
  }

  return (
    <footer>
      <button className={active === '/' ? 'active left' : ''} onClick={goHome}>
        {active === '/' ?
          <>
            <img src={homeActiveIcon} alt='house_dark' />
            {text && <p><b>Home</b></p>}
          </> :
          <>
            <img src={homeIcon} alt='house' />
            {text && <p>Home</p>}
          </>}
      </button>
      <button className={active === '/groups' ? 'active' : ''} onClick={goGroups}>
        {active === '/groups' ?
          <>
            <img src={groupsActiveIcon} alt='groups_active' />
            {text && <p><b>Groups</b></p>}
          </>
          :
          <>
            <img src={groupsIcon} alt='groups' />
            {text && <p>Groups</p>}
          </>}
      </button>
      <button className={active === '/addItem' ? 'active' : ''} onClick={goAddItem}>
        {active === '/addItem' ?
          <>
            <img src={addItemActiveIcon} alt='add_item_active' />
            {text && <p><b>Add-Item</b></p>}
          </> :
          <>
            <img src={addItemIcon} alt='add_item' />
            {text && <p>Add-Item</p>}
          </>}
      </button>
      <button className={active === '/trades' ? 'active' : ''} onClick={goTrades}>
        {active === '/trades' ?
          <>
            <img src={tradesActiveIcon} alt='trades_active' />
            {text && <p><b>Trades</b></p>}
          </> :
          <>
            <img src={tradesIcon} alt='trades' />
            {text && <p>Trades</p>}
          </>}
      </button>
      <button className={active === '/profile' ? 'active right' : ''} onClick={goProfile}>
        {active === '/profile' ?
          <>
            <img src={profileActiveIcon} alt='profile_active' />
            {text && <p><b>Profile</b></p>}
          </> :
          <>
            <img src={profileIcon} alt='profile' />
            {text && <p>Profile</p>}
          </>}
      </button>
    </footer >
  );
}

export default Footer;