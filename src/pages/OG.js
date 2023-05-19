import { useNavigate } from 'react-router-dom';

const OG = () => {
  const navigate = useNavigate();

  const changeToOGColours = () => {
    document.documentElement.style.setProperty('--primary', '#226FA8');
    document.documentElement.style.setProperty('--secondary', '#b9ddff');
    document.documentElement.style.setProperty('--filter', 'brightness(0) invert(1)');
    document.documentElement.style.setProperty('--nav-text', 'white');
    document.documentElement.style.setProperty('--nav-bg', '#226FA8');

  }

  const changeToDefaultColours = () => {
    document.documentElement.style.setProperty('--primary', '#a6ffe1');
    document.documentElement.style.setProperty('--secondary', 'rgb(48, 95, 75)');
    document.documentElement.style.setProperty('--filter', 'none');
    document.documentElement.style.setProperty('--nav-text', 'black');
    document.documentElement.style.setProperty('--nav-bg', 'white');

  }

  const goHome = () => {
    navigate('/');
  }

  return (
    <>
      <div className='og-page'>
        <h2>Welcome to the secret page where you can change BarterBetter colour's to its prototype original!</h2>
        <p>Reloading the page will revert back to default!</p>
        <div className='og-change-btns'>
          <button className='change-btn' id='original-btn' onClick={changeToOGColours}>Change to Original</button>
          <button className='change-btn' id='default-btn' onClick={changeToDefaultColours}>Change to Default</button>
        </div>
        <div className='go-home-container'>
          <button id='goHome' onClick={goHome}>
            <b>Back to Home</b>
          </button>
        </div>
      </div>
    </>
  )
}

export default OG;