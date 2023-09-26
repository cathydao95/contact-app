import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const [newContactInfo, setNewContactInfo] = useState({});

  const navigate = useNavigate();
  const handleInput = (e) => {
    setNewContactInfo((prevContact) => {
      return { ...prevContact, [e.target.name]: e.target.value };
    });
  };

  console.log(newContactInfo);
  const cancelInput = (e) => {
    e.preventDefault();
    setNewContactInfo({ name: "", email: "", phone: "", notes: "" });

    navigate("/");
  };

  const addContact = async (e) => {
    e.preventDefault();
    console.log("testing");
    try {
      const result = await fetch("http://localhost:8080/api/v1/contacts", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        body: JSON.stringify(newContactInfo),
      });
      const {
        data: { newContact },
      } = await result.json();
      navigate(`/${newContact[0].id}`);
    } catch (error) {}
  };

  return (
    <div className="contactContainer">
      <div className="btnContainer">
        <button className="btn" onClick={(e) => cancelInput(e)}>
          Cancel
        </button>
        <button className="btn" onClick={(e) => addContact(e)}>
          Done
        </button>
      </div>
      <div>
        <div className="contactImg">
          <div className="img"></div>
        </div>
      </div>
      <form className="form">
        <div className="formInfo">
          <input
            className="formInput"
            type="text"
            placeholder="name"
            value={newContactInfo.name}
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
            value={newContactInfo.phone}
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
            value={newContactInfo.email}
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
            value={newContactInfo.notes}
            name="notes"
            autoComplete="off"
            onChange={(e) => handleInput(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
