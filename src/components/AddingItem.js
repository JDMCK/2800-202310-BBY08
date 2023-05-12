import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddingItem = () => {
  // Boolean state for next button
  const [disabled, setDisabled] = useState(true);

  // States for saving values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');

  const navigate = useNavigate();

  // Checks if the item name is not empty and sets the state accordingly
  const checkItemName = (event) => {
    const itemName = event.target.value;
    if (itemName !== '') {
      setName(itemName);
      localStorage.setItem('name', itemName);
    } else {
      setName('');
      localStorage.removeItem('name');
    }
  };

  // Checks if the item description is not empty and sets the state accordingly
  const checkItemDescription = (event) => {
    const itemDescription = event.target.value;
    if (itemDescription !== '') {
      setDescription(itemDescription);
      localStorage.setItem('description', itemDescription);
    } else {
      setDescription('');
      localStorage.removeItem('description');
    }
  };

  // Select an image to upload, if selected set state accordingly
  const previewImage = (event) => {
    const imageFiles = event.target.files;
    const imageFilesLength = imageFiles.length;
    setFile(event.target.files[0]);

    if (imageFilesLength > 0) {
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      const imagePreviewElement = document.querySelector('#preview-selected-image');

      imagePreviewElement.src = imageSrc;
      imagePreviewElement.style.display = 'block';

      document.querySelector('#remove-img').removeAttribute('hidden');

      setImage(imageSrc);
      localStorage.setItem('image', imageSrc);
    }
  };

  // Remove the selected image, set the state accordingly
  const removeImage = () => {
    const removeImageBtn = document.querySelector('#remove-img');
    const imagePreviewElement = document.querySelector('#preview-selected-image');
    document.querySelector('#file-upload').value = '';
    imagePreviewElement.src = '';
    imagePreviewElement.style.display = 'none';

    removeImageBtn.setAttribute('hidden', 'hidden');
    setImage('');
    localStorage.removeItem('image');
    localStorage.removeItem('file');
  };

  // Go to Preview page passing along values for name, description and image
  const toPreview = () => {
    // Save values to local storage so that these can be loaded when going back from preview page
    localStorage.setItem('name', name);
    localStorage.setItem('description', description);
    localStorage.setItem('image', image);
    localStorage.setItem('file', file);

    navigate('/addItem/preview', { state: { itemName: name, itemDescription: description, imageSrc: image, file: file } });
  }

  // Runs once the page is loaded, preloads information from local storage if not null
  useEffect(() => {
    var savedName = localStorage.getItem('name');
    var savedDescription = localStorage.getItem('description');
    var savedImage = localStorage.getItem('image');
    var savedFile = localStorage.getItem('file');

    if (savedName !== null) {
      setName(savedName);
      document.getElementById('item-name-input').value = savedName;
    }
    if (savedDescription !== null) {
      setDescription(savedDescription);
      document.getElementById('item-description-input').value = savedDescription;
    }
    if (savedImage !== null) {
      document.getElementById('preview-selected-image').style.display = 'block';
      document.querySelector('#remove-img').removeAttribute('hidden');
      setImage(savedImage);
      document.getElementById('preview-selected-image').src = savedImage;
    }
    if (savedFile !== null) {
      setFile(savedFile)
    }
    setDisabled(true);
  }, []);

  /**
   * Runs every time fields are changed from empty to filled or vice-versa
   * Enables the next button ONLY when all fields are filled out
   */
  useEffect(() => {
    if (name !== '' && description !== '' && image !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, description, image]);

  return (
    <form className='form-input'>
      <div className='item-container'>
        <label htmlFor='item-name-input'>Item Name</label>
        <input type='text' id='item-name-input' className='item-input' name='itemName' placeholder='Enter item name here' onChange={checkItemName} />
      </div>
      <div className='item-container'>
        <label htmlFor='item-description-input'>Item Description</label>
        <textarea rows='3' id='item-description-input' className="item-input" name="itemDescription" placeholder="Enter item description here" onChange={checkItemDescription} />
      </div>
      <div className='image-preview-container'>
        <button type='button' id='remove-img' hidden='hidden' onClick={removeImage}>X</button>
        <div className='preview'>
          <img id='preview-selected-image' alt='Preview'></img>
        </div>
        <label htmlFor='file-upload'>Upload Image</label>
        <input id='file-upload' type='file' accept='image/*' onChange={previewImage} />
      </div>
      <div className='next-btn-container'>
        <button id='next-btn' disabled={disabled} type='button' onClick={() => { toPreview() }} >Next</button>
      </div>
    </form>
  );
};

export default AddingItem;
