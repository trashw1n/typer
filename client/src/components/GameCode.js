import React, {useState, useRef} from 'react';

function GameCode({gameID}) {
    const [copySuccess, setCopySuccess] = useState(false);
    const textInputRef = useRef(null);
    const copyToClipboard = e =>{
        textInputRef.current.select();
        document.execCommand('copy');
        setCopySuccess(true);
    }  
    return (
    <>
    <div className='row my-3 text-center'>
        <div className='col-sm'></div>
        <div className='col-sm-8'>
            <h4>Send this code to others to join the lobby</h4>
            <div className='input-group mb-3'>  
                <input type="text" ref={textInputRef} value={gameID} readOnly className='form-control' />
                <div className='input-group-append'>
                    <button className='btn btn-outline-secondary' onClick={copyToClipboard} type='button'>
                        Copy game code
                    </button>
                </div>
            </div>
            {copySuccess? <div className='alert alert-success' role='alert'>Game code copied!</div>:null}
        </div>
        <div className='col-sm'></div>
    </div>
    </>
    );
}

export default GameCode