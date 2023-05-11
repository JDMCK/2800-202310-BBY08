import TestData from "./MarketplaceData";
import useReadStorage from "../hooks/useReadStorage";
import "bootstrap/dist/css/bootstrap.css";

const Marketplace = () => {
  const { downloadURL } = useReadStorage("/placeholder-image-1.png");

  const listItems = TestData.map((item) => (
    <div className="col" key={item.id}>
      <div className="card shadow-sm">
        <img src={downloadURL} alt="item" />

        <div className="card-body">
          <div className="card-text">
            <p>
              <b>{item.item_name}</b>
            </p>
            <p>{item.description}</p>
            <p>{item.location}</p>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <small className="text-body-secondary">9 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="listings">
      <div className="album py-5 bg-body-tertiary">
        <h2>Current Listings</h2>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {listItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
