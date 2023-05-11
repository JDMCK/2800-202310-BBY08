import { Navbar, Footer, InventoryItem } from "../components";
// import { useReadStorage } from "../hooks";
import { gear } from '../img';
import { useNavigate } from "react-router-dom";

import downloadURL from '../img/example_profile_picture.jpg';
import tableImage from '../img/table.jpg';
import lampImage from '../img/lamp.jpg';
import clockImage from '../img/clock.jpg';

const Profile = () => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/item/${id}`)
  }

  const name = 'Meme Guy';
  const description = '⭐⭐⭐⭐⭐';
  // const { downloadURL } = useReadStorage('/profile_pictures/example_profile_picture.png');
  const items = [
    {
      name: 'table',
      id: 1,
      image: tableImage
    },
    {
      name: 'lamp',
      id: 2,
      image: lampImage
    },
    {
      name: 'clock',
      id: 3,
      image: clockImage
    }
  ]

  return (
    <>
      <Navbar title='Profile' navButtons={[
        {
          onclick: () => navigate('/settings'),
          icon: gear
        }
      ]} />
      <section className='profile'>
        <div className='profile-picture'>
          <img src={downloadURL} alt='profile' />
        </div>
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
      <section className='profile-inventory'>
        {items.map((item, i) => <InventoryItem key={i} onClick={() => handleClick(item.id)} thumbnail={item.image} />)}
      </section>
      <Footer />
    </>
  );
}

export default Profile;