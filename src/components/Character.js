import { useState } from "react";
import React from "react";
import "./Character.css";
import PopUp from "./PopUp";

const Character = (props) => {
  //Name
  const [name, setName] = useState(props.name);
  //Health
  const [health, setHealth] = useState(props.health);
  //Stamina
  const [stamina, setStamina] = useState(props.stamina);
  //Gold
  const [gold, setGold] = useState(props.gold);
  //Value of comment to display
  const [commentOnDisplay, setCommentOnDisplay] = useState(props.comment);
  //comment visibility
  const [isOpen, setIsOpen] = useState(false);
  //content of comment input field
  const [comment, setComment] = useState("");
  //location
  const [location, setLocation] = useState(props.location);
  //Is location popup open
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  //To fetch individual player
  const fetchPlayer = async () => {
    const res = await fetch(`http://localhost:5000/players/${props.id}`);
    const data = await res.json();
    return data;
  };

  const openPopup = () => {
    //setting popup open as true
    setIsLocationOpen(true);
  };

  const closePopup = () => {
    //setting popup open as false
    setIsLocationOpen(false);
  };

  //OnClickListener function for save location button
  //This function is passed as props in PopUp component
  const alterLocation = async (data) => {
    setLocation(data);
    let updatedPlayer = await fetchPlayer();
    //if condition to reduce gold for update existing location
    if (updatedPlayer.location) {
      setGold(parseInt(gold) - 1);
      updatedPlayer.gold = parseInt(updatedPlayer.gold) - 1;
    }

    updatedPlayer.location = data;

    await fetch(`http://localhost:5000/players/${updatedPlayer.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedPlayer),
    });
  };

  const alterComment = () => {
    //Boolean set to true to show input field for adding comment
    setIsOpen(true);
  };

  const submitComment = async () => {
    //Once comment is submitted, input field is hide bt setting isOpen state false
    setIsOpen(false);
    setComment("");
    setCommentOnDisplay(comment);
    let updatedPlayer = await fetchPlayer();
    updatedPlayer.comment = comment;
    await fetch(`http://localhost:5000/players/${updatedPlayer.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedPlayer),
    });
    //window.location.reload(false);
  };
  return (
    <div>
      <h2>{name}'s Bio:</h2>
      <p>Race: {props.race}</p>
      <p>
        Status: <br />
        Health at {health} <br />
        Stamina at {stamina}
      </p>
      <p>Gold: {gold}</p>
      <p className={location ? "visible" : "hidden"}>Location: {location}</p>
      <p className={commentOnDisplay ? "visible" : "hidden"}>
        Comment: {commentOnDisplay}
      </p>
      <button
        onClick={() => {
          alterComment();
        }}
      >
        {commentOnDisplay ? "Change Comment" : "Add Comment"}
      </button>
      <br />

      {isOpen && (
        <div>
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={() => submitComment()}>Submit</button>
        </div>
      )}

      {!isOpen && (
        <div>
          {" "}
          <button onClick={openPopup}>
            {location ? "Change Location (Costs 1 Gold)" : "Add Location"}
          </button>
          <PopUp
            isOpen={isLocationOpen}
            onClose={closePopup}
            alterLocation={alterLocation}
          ></PopUp>
          <br />
          <button
            onClick={async () => {
              let updatedPlayer = await fetchPlayer();
              updatedPlayer.health = parseInt(updatedPlayer.health) + 10;
              updatedPlayer.gold = parseInt(updatedPlayer.gold) - 2;
              setHealth(parseInt(health) + 10);
              setGold(parseInt(gold) - 2);

              await fetch(`http://localhost:5000/players/${updatedPlayer.id}`, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(updatedPlayer),
              });
            }}
          >
            Add 10 Health (Costs 2 Gold)
          </button>
          <br />
          <button
            onClick={async () => {
              let updatedPlayer = await fetchPlayer();
              updatedPlayer.stamina = parseInt(updatedPlayer.stamina) + 5;
              updatedPlayer.gold = parseInt(updatedPlayer.gold) - 1;

              setStamina(parseInt(stamina) + 5);
              setGold(parseInt(gold) - 1);

              await fetch(`http://localhost:5000/players/${updatedPlayer.id}`, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(updatedPlayer),
              });
            }}
          >
            Add 5 Stamina (Costs 1 Gold)
          </button>
          <br />
          <button
            onClick={async () => {
              let updatedPlayer = await fetchPlayer();
              updatedPlayer.stamina = parseInt(updatedPlayer.stamina) - 5;
              updatedPlayer.gold = parseInt(updatedPlayer.gold) + 3;
              updatedPlayer.health = parseInt(updatedPlayer.health) - 10;

              setGold(parseInt(gold) + 3);
              setHealth(parseInt(health) - 10);
              setStamina(parseInt(stamina) - 5);

              await fetch(`http://localhost:5000/players/${updatedPlayer.id}`, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(updatedPlayer),
              });
            }}
          >
            Add 3 Gold (Costs 10 Health and 5 Stamina)
          </button>
          <br />
          <label htmlFor="nameChange">Change Player's Name:</label>
          <br />
          <input
            type="text"
            id="nameChange"
            onChange={async (e) => {
              //whenever user changes the name it is updated on db
              setName(e.target.value);
              let nameEntered = e.target.value;
              let updatedPlayer = await fetchPlayer();

              updatedPlayer.name = nameEntered;

              await fetch(`http://localhost:5000/players/${updatedPlayer.id}`, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(updatedPlayer),
              });
              console.log(name);
            }}
          />{" "}
        </div>
      )}
      <br />
      <br />
      <hr />
    </div>
  );
};

export default Character;
