import React, { useState, useEffect } from "react";
import "./App.css";
import Character from "./components/Character";





export default function App() {
  const [title,setTitle]= useState('Player HUD');
  const [players, setPlayers] = useState([]);
  useEffect(()=>{
    // eslint-disable-next-line
    document.title = title;

     const getPlayers = async () => {
      const allPlayers = await fetchPlayers();
      setPlayers(allPlayers);
    };
    getPlayers();
  },[])

   const fetchPlayers = async () => {
    const res = await fetch("http://localhost:5000/players");
    const data = await res.json();
    return data;
  };
  const listComp = () => {
  return players.map((item, i) => (
    <Character
      key={i}
      name={item.name}
      race={item.race}
      status={item.status}
      comment={item.comment}
    />
  ));
};
  return (
    <div className="App">
      <label htmlFor="titleChange">Change Page Title</label>
      <input type="text" id="titleChange" onChange={(e)=>setTitle(e.target.value)}/>
      <hr/>
      <header className="App-header">{listComp()}</header>
    </div>
  );
}
