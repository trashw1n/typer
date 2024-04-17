import { useEffect, useState } from "react";
import { Route, RouterProvider, Routes, createBrowserRouter, useNavigate } from "react-router-dom";
import GameMenu from "./components/GameMenu";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Typer from "./components/Typer";
import socket from "./socketConfig";
import StartButton from "./components/StartButton";

function App() {
  let navigate = useNavigate();
  const [gameState, setGameState] = useState({_id: "", isOpen: false, players: [], words: []});
  useEffect(() =>{
    socket.on("updateGame", game =>{
      console.log(game);
      setGameState(game);
      console.log("updated game state");
    });
    return () =>{
      socket.removeAllListeners();
    }
  }, []);
  useEffect(() =>{
    if(gameState._id !== ""){
      navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id]);
  return (
    <>
    <Routes>
      <Route path="/" element={<GameMenu />} />
      <Route path="/game/create" element={<CreateGame />} />
      <Route path="/game/join" element={<JoinGame />} />
      <Route path="/game/:gameID" element={<Typer gameState={gameState} />} />
    </Routes>
    </>
  );
}

export default App;
