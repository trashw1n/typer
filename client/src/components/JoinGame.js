import { useState } from "react";
import { useNavigate } from "react-router";
import socket from "../socketConfig";

function JoinGame(props) {
  let navigate = useNavigate();
  const [userInput, setuserInput] = useState({gameID: "", nickname: ""});
  const onChange = (e) => {
    setuserInput({...userInput, [e.target.name]: e.target.value});
  };
  const onSubmit = (e) => {
    e.preventDefault();
	  console.log(userInput);
    socket.emit("join-game", userInput);
  };
  return (
    <>
      <div className="row mt-3">
        <div className="col-sm"></div>
        <div className="col-sm-8">
          <h1 className="text-center">Join game</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="nickname">Enter nickname: </label>
              <input
                type="text"
                name="nickname"
                value={userInput.nickname}
                onChange={onChange}
                placeholder="enter nickname"
                className="form-control"
              />
			  <label htmlFor="gameID" className="mt-3">Enter game ID: </label>
              <input
                type="text"
                name="gameID"
                value={userInput.gameID}
                onChange={onChange}
                placeholder="enter game ID"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ms-3"
                onClick={() => navigate(-1)}
              >
                Go back
              </button>
            </div>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    </>
  );
}

export default JoinGame;