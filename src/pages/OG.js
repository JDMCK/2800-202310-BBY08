import { useNavigate } from 'react-router-dom';

const OG = () => {

  const navigate = useNavigate();

  const changeToOGColours = () => {
    document.documentElement.style.setProperty('--primary', 'green');
    document.documentElement.style.setProperty('--secondary', '#90EE90');
  }

  const changeToDefaultColours = () => {
    document.documentElement.style.setProperty('--primary', '#226FA8');
    document.documentElement.style.setProperty('--secondary', '#b9ddff');
  }

  const goHome = () => {
    navigate('/');
  }

  return (
    <>
      <h1>Welcome to the secret page where you can change BarterBetter colour's to its prototype original!</h1>
      <button onClick={changeToOGColours}>Change to Original</button>
      <button onClick={changeToDefaultColours}>Change to default</button>
      <button onClick={goHome}>Back to Home</button>
    </>
  )
}

export default OG;