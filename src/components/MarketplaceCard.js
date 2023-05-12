import { useNavigate } from "react-router";

const MarketplaceCard = ({ item }) => {

  const timestamp = '9:00am';

  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate('/item', { state: JSON.stringify(item) });
  }

  return (
    <div className='marketplace-card' onClick={handleItemClick}>
      <img src={item.picture_URL} alt="item" />

      <div className="card-text">
        <h3>{item.item_name}</h3>
        <p>{item.description}</p>
        <b>{item.location}</b>
      </div>
      <p className='timestamp'>{timestamp}</p>
    </div>
  );
}

export default MarketplaceCard;