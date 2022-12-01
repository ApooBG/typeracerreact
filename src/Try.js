import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import './App.css';
import getTime from './CurrentTime.js';
import CountDown from './CountDown.js';
import Cookies from 'universal-cookie';




export const wordsPerMinute = (startTime, endTime, words) => {
    return Math.round(60 / (endTime - startTime) * words)
}


export const percentageOfText = (wholeText, words) => {
    var characters = wholeText.split('');
    return Math.round(100 * (characters.length) / words.length);
}

export const progressOfUser = (wordsPerMin) => {
    if (wordsPerMin < 50) {
        return wordsPerMin - 50;
    }

    else {
        return wordsPerMin - 50;
    }
}

const App = (props) => {
    const newGame = props.newGame;
    const [typeracertext, setTyperacertext] = useState(props.typeracertext);
    const [wholeText, setWholeText] = useState("");
    const [startTyping, setStartTyping] = useState("");
    const [endTyping, setEndTyping] = useState("");
    const [lastUserValue, setLastUserValue] = useState("");
    var [countWords, setCountWords] = useState(1);
    var [words, setWords] = useState(typeracertext.split(''))
    const [counter, setCounter] = useState(60);
    const [cantType, setCantType] = useState(true)

    const onChange = (e) => {

        if (newGame == false) {
            setWholeText("");
            setStartTyping("");
            setEndTyping("");
            setLastUserValue("");
            setCountWords(1);
            props.setWholeText("");
            props.setStartTyping("");
            props.setEndTyping("");
            props.setCountWords(1);
            return;
        }
        if (wholeText != typeracertext) {
            if (wholeText === "") {
                const cookies = new Cookies();
                props.setStartTyping(getTime.getTime());
                const url = "http://localhost:8080/MakePlayerActive?id=" + cookies.get('UserID');
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'React POST Request Example' })
                };
                fetch(url, requestOptions)
                    .then(response => response.json());
                    console.log("access in db");
            }

            const word = typeracertext.split(' ')[countWords - 1];
            var userText = wholeText;

            if (e.target.value.length > lastUserValue.length + 2) {
                e.target.value = userText.split(' ').pop();
                return;
            }

            if (countWords == 1) {
                userText = wholeText.split(' ').slice(0, countWords - 1).join(' ');
            }

            else {
                userText = wholeText.split(' ').slice(0, countWords - 1).join(' ') + ' ';
            }

            if (wholeText.split(' ').pop().length > e.target.value.length) {
                userText = wholeText;
                var checkWord = e.target.value;
                if (countWords == 1) {
                    userText = wholeText.split(' ').slice(0, countWords - 1).join(' ');
                }

                else {
                    userText = wholeText.split(' ').slice(0, countWords - 1).join(' ') + ' ';
                }

                for (var i = 0; i < checkWord.length; i++) {
                    if (checkWord[i] == word[i]) {
                        userText = userText + checkWord[i];
                    }

                    else {
                        e.target.style.color = 'red';
                        break;
                    }
                }
            }

            else if (e.target.value[e.target.value.length - 1] == ' ') {
                userText = userText + e.target.value;
                if (userText[userText.length - 1] != typeracertext[userText.length - 1]) {
                    e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                    return;
                }

                else {
                    if (word.localeCompare(e.target.value.substring(0, e.target.value.length - 1)) == 0) {
                        userText = wholeText;
                        setCountWords(countWords + 1);
                        props.setCountWords(countWords + 1);
                        e.target.value = '';
                    }

                    else {
                        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                        return;
                    }
                }
            }

            else {
                for (var i = 0; i < e.target.value.length; i++) {
                    if (e.target.value[i] != word[i]) {
                        e.target.style.color = 'red';
                        userText = userText + word.substring(0, i);
                        break;
                    }

                    if (i == e.target.value.length - 1) {
                        e.target.style.color = 'black';
                        userText = userText + word.substring(0, i + 1);
                    }
                }
            }

            if (wholeText === typeracertext.substring(0, typeracertext.length - 1)) {
                props.setEndTyping(getTime.getTime());
                e.target.value = "";
                props.setWholeText(typeracertext);

                const cookies = new Cookies();
                props.setStartTyping(getTime.getTime());
                const url = 'https://localhost:8080/RemoveUserFromMain?id=' + cookies.get('UserID');
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'React POST Request Example' })
                };
                fetch(url, requestOptions)
                    .then(response => response.json());
console.log("remove from db");
            }

            setWholeText(userText);
            props.setWholeText(userText);
            setLastUserValue(e.target.value);
        }
    };
    return (
        <div data-testid="add-word-input"><input name="add-word-input" placeholder="Message..." onChange={onChange}></input> </div>
    );
}

export default App;