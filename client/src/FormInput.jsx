import React from "react";

const FormInput = ({ name, value, onChange, error }) => {
  return (
    <div className="formInfo">
      {error && <p className="error">{error}</p>}
      <input
        className="formInput"
        type="text"
        placeholder={name}
        value={value}
        name={name}
        autoComplete="off"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;
