import { useEffect } from "react";

const Navbar = () => {

  useEffect(() => {
    const getCatFacts = async () => {
      const response = await fetch('/getCatFact');
      const responseJSON = await response.json();
      console.log(responseJSON);
    }
    getCatFacts();
  }, []);

  return (
    <nav className="navbar">
      <h1>The Dojo Blog</h1>
      <ul className="links">
        <a href="/">Home</a>
        <a href="/create" style={{
          color: 'white',
          backgroundColor: '#f1356d',
          borderRadius: '8px'
        }}>New Blog</a>
      </ul>
    </nav>
  );
}

export default Navbar;