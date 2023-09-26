import React from "react";

const FormInput = ({ name, value, onChange }) => {
  return (
    <div className="formInfo">
      <input
        className="formInput"
        type="text"
        placeholder={name}
        value={value}
        name={name}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
