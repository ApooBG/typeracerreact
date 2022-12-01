import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Ranked from './Ranked';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import reactDom from "react-router-dom";
import './App.css';
import CountDown from './CountDown.js';
import Try from './Try.js';
import io from 'socket.io-client'
import { type } from '@testing-library/user-event/dist/type';
import Navbar from './Navbar';
import Chat from './Chat';
import Cookies from 'universal-cookie';



const socket = io.connect("http://localhost:3001");

const Home = () => {
    const [newGame, setNewGame] = useState(false);
    const username = "ApooBG";
    const [playing, setPlaying] = useState([]);
    const [user, setUser] = useState([]);
    const [typeracertext, setTyperacertext] = useState("For the days of my life have vanished like smoke, and my bones are parched like ash, and let all my impurities be as fuel for that fire until nothing remains but the light alone.");
    const [wholeText, setWholeText] = useState("");
    const [startTyping, setStartTyping] = useState("");
    const [endTyping, setEndTyping] = useState("");
    var [countWords, setCountWords] = useState(1);
    const [cantType, setCantType] = useState();
    var [words, setWords] = useState(typeracertext.split(''))
    const [counter, setCounter] = useState();

    const wordsPerMinute = (startTime, endTime, words) => {
        return Math.round(60 / (endTime - startTime) * words)
    }

    useEffect(() => { //startup
        const cookies = new Cookies();
        if (cookies.get('UserID') == null) {
            window.location.pathname = "/Login";
        }
        else {

            const url = "http://localhost:8080/GetUser?id=" + cookies.get('UserID');
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setUser(data);
                })
        }
    }, [])

    const getCounter = () => {
        if (counter === 0) {
            const cookies = new Cookies();
            const url = 'http://localhost:8080/RemoveUserFromMain?id=' + cookies.get('UserID');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'React POST Request Example' })
            };
            fetch(url, requestOptions)
                .then(response => response.json());
        }
        if (counter <= 9) {
            return (
                "0" + counter
            )
        }

        else {
            return counter;
        }
    }

    const percentageOfText = () => {
        var characters = wholeText.split('');
        var i = Math.round(100 * (characters.length) / words.length);
        //http://localhost:8080/UpdateWPM?id=2&wpm=100
        const cookies = new Cookies();
        if (cantType === false) {
            const url = 'http://localhost:8080/UpdateWPM?id=' + cookies.get('UserID') + '&wpm=' + i;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'React POST Request Example' })
            };
            fetch(url, requestOptions)
                .then(response => response.json());
        }
        return i;
    }


    const progressOfUser = (wordsPerMin) => {
        if (wordsPerMin < 50) {
            return wordsPerMin - 50;
        }

        else {
            return wordsPerMin - 50;
        }
    }

    useEffect(() => {
        socket.on("counter", counter => {
            setCounter(counter);
        });

        socket.on("cantType", cantType => {
            setCantType(cantType);
            onTimesup(cantType);

        });
    }, [socket])

    useEffect(() => {
        socket.on("counter", counter => {
            setCounter(counter);

        });

        socket.on("cantType", cantType => {
            setCantType(cantType);
            onTimesup(cantType);

        });
    }, []);




    const Game = () => {
        if (cantType === false) {

            return (
                <Try
                    typeracertext={typeracertext}
                    setWholeText={setWholeText}if
                    setStartTyping={setStartTyping}
                    setEndTyping={setEndTyping}
                    setCountWords={setCountWords}
                    newGame={newGame}
                />
            )
        }

        else {
            return (
                <input readOnly />
            )
        }
    }



    let onTimesup = (cantType) => {
        if (cantType == true) {
            const data = [
                "If we burn our wings flying too close to the sun; if the moment of glory is over before it's begun; if the dream is won though everything is lost, we will pay the price but we will not count the cost.",
                "Frodo and Sam stood as if enchanted. The wind puffed out. The leaves hung silently again on stiff branches. There was another burst of song, and then suddenly, hopping and dancing along the path, there appeared above the reeds an old battered hat with a tall crown and a long blue feather stuck in the band.",
                "For the days of my life have vanished like smoke, and my bones are parched like ash, and let all my impurities be as fuel for that fire until nothing remains but the light alone.",
                "Then we saw him pick up all the things that were down. He picked up the cake, and the rake, and the gown, and the milk, and the strings, and the books, and the dish, and the fan, and the cup, and the ship, and the fish.",
                "The place to improve the world is first in one's own heart and head and hands, and then to work outward from there. Other people can talk about how to expand the destiny of mankind. I just want to talk about how to fix a motorcycle. I think that what I have to say has more lasting value.",
                "Without some flexibility in our definitions we'll remain forever stuck with the same old knee-jerk reactions, or worse, slide into complete apathy.",
                "Sometimes it seems like we're all living in some kind of prison, and the crime is how much we hate ourselves. It's good to get really dressed up once in a while, and admit the truth - that when you really look closely, people are so strange and so complicated that they're actually beautiful. Possibly even me.",
                "I drew the blankets over my head and tried to think of Christmas. But the grey face still followed me. It murmured, and I understood that it desired to confess something. I felt my soul receding into some pleasant and vicious region; and there again I found it waiting for me.",
                "I've noticed that about your people, Doctor. You find it easier to understand the death of one than the death of a million. You speak about the objective hardness of the Vulcan heart yet how little room there seems to be in yours.",
                "I needed all the feelings to stop boiling like a pot of dal and be cool enough for me to taste them. ",
            ];
            const random = Math.floor(Math.random() * 10);
            var newText = data[random];
            setTyperacertext(newText);
            setWholeText("");
            setStartTyping("");
            setEndTyping("");
            setWords(newText.split(''));
            setNewGame(false);
        }

        else if (cantType == false) {
            setNewGame(true);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const url = "http://localhost:8080/GetPlayersInMain";
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setPlaying(data);
                })

        }, 200);
    }, [])

    const percentageOfFinishedText = () => {
        var answer = 0;
        {
            playing.map(el => {
                answer += el.wpm
            })
        }
        return Math.round(answer / playing.length).toFixed(0);
    }
    return (
        <div className="wrapper">
            <nav>
                <span class="currentPage"><a href="/">Home</a></span>
                <a href="/Profile">Profile</a>
                <a href="/LookForRanked">Ranked</a>
                <a href="/Login">Login</a>
            </nav>
            <div className="box b">
                <div className="profilePic">
                    <img src={require('./images/rabbit.png')} />
                </div>
                <div className="profileUsername">{user.Username}</div>
                <div className="profileOptions">Options</div>
                <div className="profileLogOut">Log Out</div>
            </div>
            <div className="box c" style={{ userSelect: "none" }}>
                <div className="countingField">
                    {(cantType === false) &&
                        <span className="countdown countdownduring">{getCounter()} </span>}
                    {(cantType === true) && (
                        <span className="countdown before">{getCounter()} </span>)}
                </div>

                <span data-testid="userText" className="userTextHome">{wholeText}</span><span data-testid="typeracertext">{typeracertext.substring(wholeText.length, typeracertext.length)}</span>
                {endTyping != "" &&
                    <span className="wpmUser">{wordsPerMinute(startTyping, endTyping, countWords)} wpm.</span>}
            </div>
            <div data-testid="add-word-input2" className="box d">
                {Game()}

            </div>
            <div className="box e">
                {playing.map(el => {
                    return (
                        <>
                            <div className="username">
                                {el.Username}
                            </div>

                            <div className="progress">
                                <img src={require('./images/raccoon.png')} style={{ left: progressOfUser(el.wpm) + '%' }} />
                                <hr />
                            </div>

                            <div className="finishedText">
                                {el.wpm}
                            </div>
                        </>
                    )
                })}
                <div className="username">
                    Average
                </div>

                <div className="progress">
                    <img src={require('./images/rabbit.png')} style={{ left: progressOfUser(percentageOfFinishedText()) + '%' }} />
                    <hr />
                </div>

                <div className="finishedText">
                    {percentageOfText() &&
                        percentageOfFinishedText()}
                </div>


            </div>
            <div className="box g">
                <Chat />
            </div>
        </div>

    );
}

export default Home;