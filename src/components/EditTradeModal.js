import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import InventoryItem from "./InventoryItem";
import { useEffect, useState } from "react";

const EditTradeModal = ({ id, isSelectedByRef, userId, username, onEdit }) => {

  const [selectedItems, setSelectedItems] = useState();
  const [itemDocs, setItemDocs] = useState();

  let userRef = doc(firestore, 'users', userId);

  useEffect(() => {
    const getItems = async () => {
      const itemColRef = collection(firestore, 'items');
      const itemQuery = query(itemColRef, where('user_ref', '==', userRef));
      const itemDocs = await getDocs(itemQuery);
      setItemDocs(itemDocs.docs);
    }
    getItems();
    setSelectedItems(isSelectedByRef);

  }, [])

  const handleSelectItem = (itemDoc) => {
    if (selectedItems.filter(selectedItem => selectedItem.id === itemDoc.id).length === 1) {
      setSelectedItems(previous => previous.filter(previousDoc => previousDoc.id !== itemDoc.id))
    } else {
      setSelectedItems(previous => [...previous, itemDoc]);
    }
  }

  return (
    <dialog id={id} className='inventory-modal'>
      <h2>{username + "'s items"}</h2>
      <div className='inventory-modal-items'>
        {(itemDocs && selectedItems) && itemDocs.map((itemDoc, i) =>
          <InventoryItem key={i} thumbnail={itemDoc.data().picture_URL} onClick={() => handleSelectItem(itemDocs[i])}
            isSelected={selectedItems.filter(selectedItem => selectedItem.id === itemDoc.id).length === 1} />)
        }
      </div>
      <div className='trade-button-container'>
        <button className='edit-trade-button' onClick={() => {
          onEdit(selectedItems);
          document.getElementById(id).close();
        }}>{id === 'offer-modal' ? 'Edit Offer' : 'Edit Request'}</button>
      </div>
    </dialog>
  );
}

export default EditTradeModal;