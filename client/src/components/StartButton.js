import React, {useState} from 'react';
import socket from '../socketConfig';

function StartButton({player, gameID}) {
    const [showBtn, setShowBtn] = useState(true);
    const {isPartyLeader} = player;
    const onClickHandler = _ =>{
        socket.emit("timer", {playerID: player._id, gameID});
        setShowBtn(false);
    }
    return (
        <>
        {(isPartyLeader && showBtn)? 
            <button 
                type='button' 
                onClick={onClickHandler}
                className='btn btn-primary mt-3'
            > 
            Start game
            </button> : null
        }
        </>
    );
}

export default StartButton;