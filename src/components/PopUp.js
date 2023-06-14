import React from "react";
import { useState } from "react";

import ReactModal from "react-modal";

const PopUp = ({ isOpen, onClose, alterLocation }) => {
  //CSS for POPUP
  const customStyles = {
    content: {
      width: "50%",
      height: "50%",
      margin: "auto",
    },
  };
  const [locationData, setLocationData] = useState("");
  const saveLocation = () => {
    //alterLocation() is a method from parent component which is called when user clicks on save button
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
