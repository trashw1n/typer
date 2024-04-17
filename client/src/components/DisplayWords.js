import React from 'react';

const typedCorrectlyStyle = {
    "backgroundColor": "#34eb77"
}
const currentWordStyle = {
    "textDecoration": "underline"
}

const getTypedWords = (words, player) =>{
    let typedWords = words.slice(0, player.currentWordIndex).join(" ");
    return <span style={typedCorrectlyStyle}>{typedWords} </span>
}
const getCurrentWord = (words, player) =>{
    return <span style={currentWordStyle}>{words[player.currentWordIndex]}</span>
}   
const getWordsToBeTyped = (words, player) =>{
    let wordsToBeTyped = words.slice(player.currentWordIndex+1, words.length).join(" ");
    return <span> {wordsToBeTyped}</span>
}

function DisplayWords({words, player}) {
  return (
    <>
    {getTypedWords(words, player)}
    {getCurrentWord(words, player)}
    {getWordsToBeTyped(words, player)}
    </>
  )
}

export default DisplayWords