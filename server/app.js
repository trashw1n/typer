require("dotenv").config();
const connectToDB = require("./db/connect");
const Game = require("./Models/Game");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const socketio = require("socket.io");
const mongoose = require("mongoose");
const quotableAPI = require("./quotableAPI");

const PORT = process.env.SERVER_PORT || 3001;

const start = async () =>{
    try{
        await connectToDB(process.env.MONGO_URI)
        const server = app.listen(PORT, () =>{
            console.log(`server listening on port ${PORT}`);
        });
        const io = socketio(server, {
            cors: {
                origin:'http://localhost:3000'
            }
        });
        io.on("connect", socket =>{
            socket.on("create-game", async (nickname) =>{
                try {
                    console.log(`${nickname} requested to create a new game`);
                    let game = new Game();
                    const quotableData = await quotableAPI();
                    game.words = quotableData;
                    let player = {
                        socketID: socket.id,
                        isPartyLeader: true,
                        nickname
                    }
                    game.players.push(player);
                    game = await game.save();
                    const gameID = game._id.toString();
                    socket.join(gameID);
                    io.to(gameID).emit("updateGame", game);
                } catch (error) {
                    console.log(error);
                }
            });
            socket.on("join-game", async ({gameID, nickname}) =>{
                try {
                    console.log(`${nickname} requested to join room#${gameID}`);
                    let game = await Game.findById(gameID);
                    if(game.isOpen){
                        socket.join(gameID);
                        let player = {
                            socketID: socket.id,
                            nickname
                        }
                        game.players.push(player);
                        game = await game.save();
                        io.to(gameID).emit('updateGame', game);
                    }
                } catch (error) {
                    console.log(error);
                }
            });
            socket.on("timer", async ({playerID, gameID}) =>{
                let countdown = process.env.TIME_UNTIL_GAME_STARTS;
                let game = await Game.findById(gameID);
                let player = game.players.id(playerID);
                if(player.isPartyLeader){
                    let timerID = setInterval(async () =>{
                        if(countdown >= 0){
                            io.to(gameID).emit("timer", {countdown, msg: "Starting game..."});
                            countdown--;
                        }
                        else{
                            game.isOpen = false;
                            game = await game.save();
                            io.to(gameID).emit("updateGame", game);
                            startGameClock(gameID);
                            clearInterval(timerID);
                        }
                    }, 1000);
                }
            });
            socket.on("userInput", async ({userInput, gameID}) =>{
                try {
                    let game = await Game.findById(gameID);
                    if(!game.isOpen && !game.isOver){
                        let requestingPlayer = game.players.find(player => player.socketID === socket.id);
                        let word = game.words[requestingPlayer.currentWordIndex];
                        if(word === userInput){
                            requestingPlayer.currentWordIndex++;
                            if(requestingPlayer.currentWordIndex !== game.words.length){
                                game = await game.save();
                                io.to(gameID).emit("updateGame", game);
                            }
                            else{
                                let endTime = new Date().getTime();
                                let {startTime} = game;
                                requestingPlayer.WPM = calculateWPM(startTime, endTime, requestingPlayer);
                                game = await game.save();
                                socket.emit("done");
                                io.to(gameID).emit("updateGame", game); 
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        });
        async function startGameClock(gameID){
            let game = await Game.findById(gameID);
            game.startTime = new Date().getTime();
            game = await game.save();
            let time = process.env.GAME_DURATION_SECONDS; 
            let timerID = setInterval(function gameIntervalFunc(){
                if(time >= 0){
                    const formattedTime = formatTime(time);
                    io.to(gameID).emit("timer", {countdown: formattedTime, msg: "Time remaining"});
                    time--;
                }
                else{
                    (async () =>{  
                        let endTime = new Date().getTime();
                        let game = await Game.findById(gameID);
                        let {startTime} = game;
                        game.isOver = true;
                        game.players.forEach((player, idx) =>{
                            if(player.WPM === -1){
                                game.players[idx].WPM = calculateWPM(startTime, endTime, player);
                            }
                        });
                        game = await game.save();
                        io.to(gameID).emit("updateGame", game);
                        clearInterval(timerID);
                    })();
                }
                return gameIntervalFunc;
            }(), 1000);
        }
    } catch(err){
        console.log(err);
    }
}

start();

const formatTime = (time) =>{
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    return `${minutes}:${seconds<10? "0"+seconds:seconds}`;
}

const calculateWPM = (start, end, player) =>{
    let numWords = player.currentWordIndex;
    const durationMinutes = (end-start)/60000; //convert ms to minutes
    return Math.floor(numWords/durationMinutes);

}


