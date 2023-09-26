import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ViewContact = () => {
  const { id } = useParams();

  const [contact, setContact] = useState();

  const [contactInfo, setContactInfo] = useState({});

  const [isEditing, setIsEditing] = useState(false);

  const getSingleContact = async () => {
    const result = await fetch(`http://localhost:8080/api/v1/contacts/${id}`);

    const {
      data: { contact },
    } = await result.json();

    setContact(contact[0]);
    setContactInfo({
      name: contact[0].name,
      email: contact[0].email,
      phone: contact[0].phone,
      notes: contact[0].notes,
    });
  };

  // console.log(contactInfo, "IINFOO");
  useEffect(() => {
    getSingleContact();
  }, []);

  const handleInput = (e) => {
    setContactInfo((prevContact) => {
      return { ...prevContact, [e.target.name]: e.target.value };
    });
  };

  const updateContact = async (e, id) => {
    e.preventDefault();
    try {
      const result = await fetch(
        `http://localhost:8080/api/v1/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/JSON",
          },
          body: JSON.stringify(contactInfo),
        }
      );

      const {
        data: { updatedContact },
      } = await result.json();
      setContact(updatedContact[0]);
    } catch (error) {}
  };

  const deleteContact = (e) => {
    e.preventDefault();
    try {
    } catch {}
  };

  return (
    contact !== undefined && (
      <div className="contactContainer">
        {!isEditing ? (
          <div>
            <div className="btnContainer">
              <Link to="/" className="btn">
                {"< Contacts"}
              </Link>
              <button className="btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </div>
            <div>
              <div className="contactImg">
                {/* <div className="img">{getInitials(name)}</div> */}
              </div>
              <div className="nameText">{contact.name}</div>
              <div className="infoContainer">
                <div className="info">
                  <p>mobile</p>
                  <p className="infoText">{contact.phone}</p>
                </div>
                <div className="info">
                  <p>email</p>
                  <p className="infoText">{contact.email}</p>
                </div>
                <div className="info notes">
                  <p>Notes</p>
                  <p className="infoText">{contact.notes}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="contactContainer">
            <div className="btnContainer">
              <button className="btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="btn" onClick={(e) => updateContact(e, id)}>
                Done
              </button>
            </div>
            <div>
              <div className="contactImg">
                {/* {!isEditing && <div className="img">{getInitials(name)}</div>} */}
              </div>
              <form className="form">
                <div className="formInfo">
                  <input
                    className="formInput"
                    type="text"
                    placeholder="name"
                    value={contactInfo.name}
                    name="name"
                    autoComplete="off"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="formInfo">
                  <input
                    className="formInput"
                    type="text"
                    placeholder="phone"
                    value={contactInfo.phone}
                    name="phone"
                    autoComplete="off"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="formInfo">
                  <input
                    className="formInput"
                    type="text"
                    placeholder="email"
                    value={contactInfo.email}
                    name="email"
                    autoComplete="off"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="formInfo">
                  <textarea
                    className="formInput"
                    type="text"
                    placeholder="Notes"
                    value={contactInfo.notes}
                    name="notes"
                    autoComplete="off"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <button className="deleteBtn">Delete Contact</button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ViewContact;
