import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";

const CreateContact = () => {
  const [newContactInfo, setNewContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const { name, phone } = newContactInfo;
    const errors = {};
    if (!name) {
      errors.name = "Please enter contact's name";
    }

    if (!phone) {
      errors.phone = "Please enter contact's phone number";
    }

    return errors;
  };

  const navigate = useNavigate();
  const handleInput = (e) => {
    setNewContactInfo((prevContact) => {
      return { ...prevContact, [e.target.name]: e.target.value };
    });
  };

  const cancelInput = (e) => {
    e.preventDefault();
    setNewContactInfo({ name: "", email: "", phone: "", notes: "" });

    navigate("/");
  };

  const addContact = async (e) => {
    e.preventDefault();
    // Check if there are validation errors
    const validationErrors = validateFields();
    // Use object.keys to turn object into an array and check length of keys
    let validationKeys = Object.keys(validationErrors);
    // If length greater than 0, there are validation errors
    if (validationKeys.length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/v1/contacts", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        body: JSON.stringify(newContactInfo),
      });
      if (response.ok) {
        const {
          data: { newContact },
        } = await response.json();
        navigate(`/${newContact[0].id}`);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occurred while creating contact", error);
      throw error;
    }
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
        <FormInput
          name="name"
          value={newContactInfo.name}
          onChange={(e) => handleInput(e)}
          error={errors.name}
          // Add required to name field
          required
        />
        <FormInput
          name="phone"
          value={newContactInfo.phone}
          onChange={(e) => handleInput(e)}
          error={errors.name}
        />
        <FormInput
          name="email"
          value={newContactInfo.email}
          onChange={(e) => handleInput(e)}
          // Add required to email field
          required
        />

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
