const PreviewCard = (props) => {
	// Writes prop items to firebase
	const confirmAddItem = () => {

	}

  return (
    <>
      <div className="preview-card">
        <h1>{props.itemName}</h1>
        <p>{props.itemDesc}</p>
        <img src={props.imgSrc} alt="Preview" />
      </div>
			<button type='button' onClick={confirmAddItem}>Confirm</button>
    </>
  );
};

export default PreviewCard;
