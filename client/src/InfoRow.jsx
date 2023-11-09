import React from "react";

const InfoRow = ({ title, value }) => {
  return (
    <div className={title === "notes" ? "info notes" : "info"}>
      <p>{title}</p>
      <p className="infoText">{value}</p>
    </div>
  );
};

export default InfoRow;
