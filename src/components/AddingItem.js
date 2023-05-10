import { useState, useEffect } from 'react';

const AddingItem = () => {
  const [disabled, setDisabled] = useState(true);
  const [nameFilled, setNameFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);


  const checkItemName = ((event) => {
    if (event.target.value !== '') {
      setNameFilled(true);
    } else {
      setNameFilled(false);
    }
  });

  const checkItemDescription = ((event) => {
    if (event.target.value !== '') {
      setDescriptionFilled(true);
    } else {
      setDescriptionFilled(false);
    }
  });

  useEffect(() => {
    if (nameFilled && descriptionFilled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameFilled, descriptionFilled]);
  
  return (
    <div className='form-input'>
      <form className='form-inside-input'>
        <input type='text' name='itemName' placeholder='Item Name' onChange={checkItemName}/>
        <textarea rows='3' name='itemDescription' placeholder='Item Description' onChange={checkItemDescription}/>
        <br></br>
        <input disabled={disabled} type='submit' value='Next' />
      </form>
    </div>
  );
}

export default AddingItem;