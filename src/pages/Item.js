import { useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";

import lamp from '../img/lamp.jpg';

const Item = () => {

  const { id } = useParams();

  const name = 'Lamp';
  const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus at eveniet libero autem harum expedita corrupti. Maxime non rem dolorum?';

  return (
    <>
      <Navbar title='Item' backArrow={true} />
      <div className='item'>
        <img src={lamp} alt='item' />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <Footer />
    </>
  );
}

export default Item;