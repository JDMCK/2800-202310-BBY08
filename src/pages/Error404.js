import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <h1>Error 404: Page not found.</h1>
      <Link to={'/'}>Go Home</Link>
    </>
  );
}

export default Error404;