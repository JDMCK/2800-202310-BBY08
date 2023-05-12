import { useNavigate } from "react-router-dom";
import { Navbar, Footer, MarketplaceCard } from "../components";
import { scrollIcon, searchIcon } from "../img";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../config/firebase";

const Home = () => {

  const itemsCollectionRef = collection(firestore, 'items');
  const [items] = useCollectionDataOnce(itemsCollectionRef);

  const navigate = useNavigate();

  return (
    <>
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
            icon: scrollIcon,
            onclick: () => {
              navigate("/");
            },
          },
        ]}
      />
      <div className='marketplace-feed'>
        {items && items.map((item, i) => (
          <MarketplaceCard key={i} item={item} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
