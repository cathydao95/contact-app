import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import InfoRow from "./InfoRow";

const ViewContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      setIsEditing(false);
    } catch (error) {}
  };

  const deleteContact = async (e, id) => {
    e.preventDefault();
    try {
      const result = await fetch(
        `http://localhost:8080/api/v1/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/JSON",
          },
        }
      );
      const data = await result.json();
      navigate("/");
    } catch (error) {}
  };

  const getInitials = (name) => {
    let arr = name.split(" ");
    if (arr.length > 1) {
      return `${arr[0][0]} ${arr[1][0]}`;
    } else {
      return `${arr[0][0]}`;
    }
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
                <div className="img">{getInitials(contactInfo.name)}</div>
              </div>
              <div className="nameText">{contact.name}</div>
              <div className="infoContainer">
                <InfoRow title="phone" value={contact.phone} />
                <InfoRow title="email" value={contact.email} />
                <InfoRow title="notes" value={contact.notes} />
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
                <div className="img">{getInitials(contactInfo.name)}</div>
              </div>
              <form className="form">
                <FormInput
                  name="name"
                  value={contactInfo.name}
                  onChange={(e) => handleInput(e)}
                />
                <FormInput
                  name="phone"
                  value={contactInfo.phone}
                  onChange={(e) => handleInput(e)}
                />
                <FormInput
                  name="email"
                  value={contactInfo.email}
                  onChange={(e) => handleInput(e)}
                />
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
                <button
                  className="deleteBtn"
                  onClick={(e) => deleteContact(e, id)}
                >
                  Delete Contact
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ViewContact;
