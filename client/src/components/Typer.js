import React from 'react'
import {Navigate} from "react-router-dom";
import Countdown from "./Countdown";
import StartButton from "./StartButton";
import DisplayWords from "./DisplayWords";
import Form from "./Form";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import GameCode from "./GameCode";
import socket from "../socketConfig";	

function Typer({gameState}) {
	const {_id, players, words, isOpen, isOver} = gameState;
	const player = players.find(player => player.socketID === socket.id);;
	if(_id === ""){
		return <Navigate to="/" />
	}
  	return (
	<>
	<div className='text-center mt-3'>
		<DisplayWords words={words} player={player} />
		<ProgressBar players={players} player={player} wordsLength={words.length} />
		<Form isOpen={isOpen} isOver={isOver} gameID={_id} />
		<Countdown />
		<StartButton player={player} gameID={_id} />
		<GameCode gameID={_id} />
		<ScoreBoard players={players}/>
	</div>
	</>
  	);
}

export default Typer;