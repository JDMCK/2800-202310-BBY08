import { useNavigate } from "react-router-dom";
import { Navbar, Footer, MarketplaceCard } from "../components";
import { chatIcon, searchIcon } from "../img";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

const Home = () => {

  const [items, setItems] = useState();

  useEffect(() => {
    const getItemDocs = async () => {
      const itemsColRef = collection(firestore, 'items');
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
          title="BarterBetter"
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
