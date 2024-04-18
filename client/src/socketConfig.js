import io from 'socket.io-client';
/*const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};*/
const socket = io('https://typer-hz7k.onrender.com');
export default socket;