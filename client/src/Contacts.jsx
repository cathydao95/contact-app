import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState();

  const getContacts = async () => {
    try {
      let response = await fetch("http://localhost:8080/api/v1/contacts");

      if (response.ok) {
        let {
          data: { contacts },
        } = await response.json();
        setContacts(contacts);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occurred while fetching contacts", error);
      throw error;
    }
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
