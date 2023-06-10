import React from "react";
import { useState } from "react";

import ReactModal from "react-modal";

const PopUp = ({ isOpen, onClose, alterLocation }) => {
  const customStyles = {
    content: {
      width: "50%", // Adjust the width as needed
      height: "50%", // Adjust the height as needed
      margin: "auto",
    },
  };
  const [locationData, setLocationData] = useState("");
  const saveLocation = () => {
    alterLocation(locationData);
    setLocationData("");
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Popup"
      style={customStyles}
    >
      <div className="popup">
        {/* Content of the popup */}
        <input
          type="text"
          value={locationData}
          onChange={(e) => {
            setLocationData(e.target.value);
          }}
        />
        <br />
        <button onClick={saveLocation}>Save Location</button>
        <br />
        <button onClick={onClose}>Close Popup</button>
      </div>
    </ReactModal>
  );
};

export default PopUp;
