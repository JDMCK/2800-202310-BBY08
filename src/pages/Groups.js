import { Footer, Navbar } from '../components';
import { construction } from '../img';

const Groups = () => {
  return (
    <>
      <Navbar title="Groups" />
      <div id="groupsContainer">
        <img src={construction} alt="Under Construction" />
        <h3>Under Construction</h3>
      </div>
      <Footer />
    </>
  );
}

export default Groups;