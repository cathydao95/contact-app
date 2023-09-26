import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState();
  const getContacts = async () => {
    let results = await fetch("http://localhost:8080/api/v1/contacts");
    let {
      data: { contacts },
    } = await results.json();
    setContacts(contacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    contacts && (
      <div>
        {contacts.map((contact) => {
          const { id, name, email, phone, notes } = contact;
          return (
            <div key={id} className="contactRow">
              <Link to={`/${id}`}>{name}</Link>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Contacts;
