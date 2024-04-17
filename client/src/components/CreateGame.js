import { useState } from "react";
import { useNavigate } from "react-router";
import socket from "../socketConfig";

function CreateGame(props) {
  let navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const onChange = e =>{
    setNickname(e.target.value);
  }
  const onSubmit = e =>{
    e.preventDefault();
    socket.emit("create-game", nickname);
  }
  return (
    <>
      <div className="row mt-3">
        <div className="col-sm"></div>
        <div className="col-sm-8">
          <h1 className="text-center">Create game</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="nickname">Enter nickname: </label>
              <input 
                type="text" 
                name="nickname" 
                value={nickname} 
                onChange={onChange} 
                placeholder="enter nickname"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
              <button 
                type="button" 
                className="btn btn-secondary mt-3 ms-3" 
                onClick={() => navigate(-1)}>
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

export default CreateGame;