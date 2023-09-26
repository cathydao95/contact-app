import React from "react";
import Contacts from "./Contacts";
const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <h1 className="title">All Contacts</h1>
        <button className="addBtn">+</button>
      </nav>
      <div className="block"></div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
