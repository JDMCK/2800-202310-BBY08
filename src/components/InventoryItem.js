const InventoryItem = ({ onClick, thumbnail, isSelected }) => {
  return (
    <button onClick={onClick} className={`inventory-item ${isSelected ? 'inventory-item-selected' : ''}`}>
      <img src={thumbnail} alt='thumbnail' />
    </button>
  );
}

export default InventoryItem;