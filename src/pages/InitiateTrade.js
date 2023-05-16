import { useLocation } from 'react-router-dom';
import { Navbar } from '../components';

const InitiateTrade = () => {
  const location = useLocation();

  return (
    <>
      <Navbar title='Initiate Trade' backArrow={true}/>
    </>
  );
};

export default InitiateTrade;