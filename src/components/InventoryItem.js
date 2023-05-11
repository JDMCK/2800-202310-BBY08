const InventoryItem = ({ onClick, thumbnail }) => {
  return (
    <button onClick={onClick} className='inventory-item'>
      <img src={thumbnail} alt='thumbnail' />
    </button>
  );
}

export default InventoryItem;