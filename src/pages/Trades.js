import { Footer, Navbar, Tab } from "../components";

const Trades = () => {
  // Names for tabs
  let incoming = 'Incoming Offers';
  let sent = 'Sent Offers'

  // Onclick functions for tabs
  const displayIncoming = () => {

  };

  const displaySent = () => {

  };

  return (
    <>
      <Navbar title="Trades" />
      <div className='trade-tabs'>
        <Tab onClick={() => displayIncoming()} selected={true} tabName={incoming} />
        <Tab onClick={() => displaySent()} selected={false} tabName={sent} />
      </div>
      <Footer />
    </>
  );
}

export default Trades;