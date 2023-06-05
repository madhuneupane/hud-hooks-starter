import React, { useState, useEffect } from "react";
import "./App.css";
import Character from "./components/Character";

const charArray = [
  {
    name: "Mark",
    race: "Human",
    status: "Full-Health",
    comment: "",
  },
  {
    name: "Goerge",
    race: "Demon",
    status: "Enraged",
    comment: "I'm so ANGRY!!!!",
  },
  {
    name: "Angela",
    race: "Fairy",
    status: "Full-Health",
    comment: "",
  },
];

const listComp = () => {
  return charArray.map((item, i) => (
    <Character
      key={i}
      name={item.name}
      race={item.race}
      status={item.status}
      comment={item.comment}
    />
  ));
};

export default function App() {
  const [title,setTitle]= useState('Player HUD');
  useEffect(()=>{
    document.title = title;
  })
  return (
    <div className="App">
      <label htmlFor="titleChange">Change Page Title</label>
      <input type="text" id="titleChange" onChange={(e)=>setTitle(e.target.value)}/>
      <hr/>
      <header className="App-header">{listComp()}</header>
    </div>
  );
}
