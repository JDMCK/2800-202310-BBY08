import { useLocation } from 'react-router-dom';
import { Navbar, PreviewCard } from '../components';
 
const Preview = () => {
  const location = useLocation();

  return (
    <>
      <Navbar title='Preview' backArrow={true} />
      <PreviewCard imgSrc={location.state.imageSrc} itemName={location.state.itemName} itemDesc={location.state.itemDescription} file={location.state.file}/>
    </>
  );
}

export default Preview;