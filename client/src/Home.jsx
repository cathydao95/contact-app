import React from "react";
import { Link } from "react-router-dom";
import Contacts from "./Contacts";
const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <h1 className="title">All Contacts</h1>
        <Link to="/create">+</Link>
      </nav>
      <div className="block"></div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
