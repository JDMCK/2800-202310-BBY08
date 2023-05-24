import { useNavigate } from "react-router-dom";
import { Navbar, Footer, MarketplaceCard } from "../components";
import { chatIcon, searchIcon, logo } from "../img";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../config/firebase";

const Home = () => {

  const [items, setItems] = useState();

  useEffect(() => {
    const getItemDocs = async () => {
      const itemsColRef = query(collection(firestore, 'items'), orderBy('timeStamp', 'desc'));
      const itemDocs = await getDocs(itemsColRef);
      setItems(itemDocs);
    }
    getItemDocs();
  }, [])

  const navigate = useNavigate();

  return (
    <>
      <div className='marketplace-feed'>
        <Navbar
        title={<img src={logo} alt='BarterBetter' className='nav-logo'/>}
          navButtons={[
            {
              icon: searchIcon,
              onclick: () => {
                navigate("/");
              },
            },
            {
              icon: chatIcon,
              onclick: () => {
                navigate("/conversations");
              },
            },
          ]}
        />
        {items && items.docs.map((itemDoc, i) => (
          <MarketplaceCard key={i} itemDoc={itemDoc} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
