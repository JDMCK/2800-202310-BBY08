import { useState } from 'react';
import useFetch from '../hooks/useFetch';


const Navbar = () => {

  const url = '/getCatFact';
  const { data, isPending, error } = useFetch(url);

  return (
    <nav className="navbar">
      <h1>{data && JSON.stringify(data)}</h1>
      <h1>{isPending && JSON.stringify(isPending)}</h1>
    </nav >
  );
}

export default Navbar;