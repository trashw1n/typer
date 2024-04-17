import React, {useState, useEffect, useRef} from 'react';
import socket from '../socketConfig';

function Form({isOpen, isOver, gameID}) {
    const [userInput, setUserInput] = useState("");
    const textInput = useRef(null);
    useEffect(() =>{
        if(!isOpen){
            textInput.current.focus();  
        }
    }, [isOpen]);
    const handleOnChange = e =>{
        let val = e.target.value;
        let lastChar = val.charAt(val.length-1);
        if(lastChar === " "){
            socket.emit("userInput", {userInput, gameID});
            setUserInput(""); //reset form
        }else{
            setUserInput(val);
        }
    }
    return (
        <>
        <div className='row my-3 text-center'>
            <div className='col-sm'></div>
            <div className='col-sm-4'>
                <form>
                    <div className='form-group'>
                        <input 
                            type='text' 
                            readOnly={isOpen || isOver} 
                            onChange={handleOnChange}
                            value={userInput}
                            className='form-control'
                            ref={textInput}
                        />
                    </div>
                </form>
            </div>
            <div className='col-sm'></div>
        </div>
        </>
    )
}

export default Form