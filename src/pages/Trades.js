import { useState } from 'react';
import { Footer, Navbar, Tab } from "../components";

const Trades = () => {
  const [incomingSelected, setIncomingSelected] = useState(true);
  const [sentSelected, setSentSelected] = useState(false);

  // Names for tabs
  let incoming = 'Incoming Offers';
  let sent = 'Sent Offers'

  // Onclick functions for tabs
  const displayIncoming = () => {
    if (incomingSelected !== true) {
      setIncomingSelected(true);
      setSentSelected(false);
    }
  };

  const displaySent = () => {
    if (sentSelected !== true) {
      setSentSelected(true);
      setIncomingSelected(false);
    }
  };

  return (
    <>
      <Navbar title="Trades" />
      <div className='trade-tabs'>
        <Tab id='incomingTab' onClick={() => displayIncoming()} selected={incomingSelected} tabName={incoming} />
        <Tab id='sentTab' onClick={() => displaySent()} selected={sentSelected} tabName={sent} />
      </div>
      <div id='trades'>
        {incomingSelected && <p>Incoming offers stuff</p>}
        {sentSelected && <p>Sent offers stuff</p>}
      </div>
      <Footer />
    </>
  );
}

export default Trades;