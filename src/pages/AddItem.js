import { Navbar, AddingItem } from '../components';

const AddItem = () => {
  return (
    <>
      <Navbar title='Add-Item' backArrow={true} />
      <AddingItem />
    </>
  );
}

export default AddItem;