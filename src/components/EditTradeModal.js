import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import InventoryItem from "./InventoryItem";
import { useEffect, useState } from "react";

const EditTradeModal = ({ id, isSelectedById, username, onEdit }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [itemDocs, setItemDocs] = useState();

  let userRef = doc(firestore, 'users', 'AEcU6BDzYWZtzVLQYaoT5qu2fgh2');
  userRef = JSON.parse(JSON.stringify(userRef));
  const userDocRef = doc(firestore, 'users', userRef._key.path.segments.at(-1))

  const getItems = async () => {
    const itemColRef = collection(firestore, 'items');
    const itemQuery = query(itemColRef, where('user_ref', '==', userDocRef));
    const itemDocs = await getDocs(itemQuery);
    setItemDocs(itemDocs.docs);
  }

  useEffect(() => {
    getItems();
  }, [])

  const handleSelectItem = (itemDoc) => {
    if (selectedItems.includes(itemDoc)) {
      setSelectedItems(previous => previous.filter(previousDoc => previousDoc.id !== itemDoc.id))
    } else {
      setSelectedItems(previous => [...previous, itemDoc]);
    }
  }

  return (
    <dialog id={id} className='inventory-modal'>
      <h2>{username + "'s items"}</h2>
      <div className='inventory-modal-items'>
        {itemDocs && itemDocs.map((itemDoc, i) =>
          <InventoryItem key={i} thumbnail={itemDoc.data().picture_URL} onClick={() => handleSelectItem(itemDocs[i])}
            isSelected={selectedItems.includes(itemDoc)} />)}
      </div>
      <div className='trade-button-container'>
        <button className='edit-trade-button' onClick={() => {
          onEdit(selectedItems);
          document.getElementById(id).close();
        }}>{id === 'sender-modal' ? 'Edit Offer' : 'Edit Request'}</button>
      </div>
    </dialog>
  );
}

export default EditTradeModal;