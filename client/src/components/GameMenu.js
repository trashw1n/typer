import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function GameMenu(props) {
    let navigate = useNavigate();
    return (
        <>
        <div className='text-center mt-4'>
            <h1>Welcome to Typer</h1>
            <button 
                type="button" 
                onClick={() => navigate("/game/create")} 
                className='btn btn-primary btn-lg me-3 mt-3'
            > create game </button>
            <button 
                type="button" 
                onClick={() => navigate("/game/join")} 
                className='btn btn-primary btn-lg mt-3'
            > join game </button>
        </div>
        </>
    );
}
