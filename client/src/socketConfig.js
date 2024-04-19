import io from 'socket.io-client';
/*const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};*/
const socket = io(process.env.REACT_APP_SERVER_ADDRESS);
export default socket;