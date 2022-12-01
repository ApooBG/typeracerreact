import React from 'react';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import './App.css';
import CountDown from './CountDown.js';
import Try from './Try.js';
import io from 'socket.io-client'
import { type } from '@testing-library/user-event/dist/type';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'


const socket = io.connect("http://localhost:3001");



const Ranked = () => {
    const [typeracertext, setTyperacertext] = useState("For the days of my life have vanished like smoke, and my bones are parched like ash, and let all my impurities be as fuel for that fire until nothing remains but the light alone.");
    const [userText, setUserText] = useState("");
    const [currentLetter, setCurrentLetter] = useState(0);
    const [countMistakes, setCountMistakes] = useState(0);
    const [characterCount, setCharacterCount] = useState(-1);
    var [words, setWords] = useState(typeracertext.split(''));
    const [wholeText, setWholeText] = useState("");
    const [countWords, setCountWords] = useState(0);
    const [cantType, setCantType] = useState();
    const [counter, setCounter] = useState();
    const [startTyping, setStartTyping] = useState("");
    const [endTyping, setEndTyping] = useState("");
    const [newGame, setNewGame] = useState(false);
    

    let onTimesup = (cantType) => {
        console.log(cantType);
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

    const percentageOfText = () => {
        var characters = wholeText.split('');
        return Math.round(100 * (characters.length) / words.length);
    }

    const progressOfUser = (wordsPerMin) => {
        if (wordsPerMin < 50) {
            return wordsPerMin - 50;
        }

        else {
            return wordsPerMin - 50;
        }
    }

    const Game = () => {
        if (cantType == false)
        {
            return (
                <div className="userText"> <input placeholder="Message..." onChange={onChange}></input> </div>
            )
        }

        else
        {
            return (
                <div className="userText"> <input placeholder="Message..." readOnly/> </div>
            )
        }
    }

    const getCounter = () => {
        if (counter <= 9) {
            return (
                "0" + counter
            )
        }

        else {
            return counter;
        }
    }


    useEffect(() => {
        socket.on("counterRanked", counter => {
            setCounter(counter);
        });

        socket.on("cantTypeRanked", cantType => {
            setCantType(cantType);
            onTimesup(cantType);

        });
    }, [socket])

    const onChange = (e) => {
        let currentWord = typeracertext.split(' ')[countWords];
        if (typeracertext.split(' ')[countWords].length >= e.target.value.length) {
            if (currentLetter > e.target.value.length) {
                setCharacterCount(characterCount - 1);
                setCurrentLetter(currentLetter - 1);
            }
            else {
                setCharacterCount(characterCount + 1);
                setCurrentLetter(currentLetter + 1);
            }
        }

        if (e.target.value[e.target.value.length - 1] == " ") {
            setCountWords(countWords + 1);
            setCurrentLetter(0);


            if (currentWord + ' ' != e.target.value) {
                setCountMistakes(countMistakes + 1);
                setCharacterCount(characterCount - currentLetter + currentWord.length + 1);
                console.log("mistaken");
            }

            else {
                setCharacterCount(characterCount - currentLetter + currentWord.length + 1);
                console.log("notmistaken");
            }

            e.target.value = "";
        }

        console.log("Mistakes are: " + countMistakes);
        console.log(userText);
    };

    return (
        <div className="ranked-container">
            <div className="box AA">
                <nav>
                    <a href="/">Home</a>
                    <a href="/Profile">Profile</a>
                    <a href="/LookForRanked">Ranked</a>
                    <span class="currentPage"><a href="/Ranked">RealRanked</a></span>
                </nav>
            </div>
            <div className="box BB">
                <div className="profilePic">
                    <img src={require('./images/rabbit.png')} />
                </div>
                <div className="profileUsername">ApooBG</div>
                <div className="profileOptions">Options</div>
                <div className="profileLogOut">Log Out</div>
            </div>

            <div className="box CC">
                <div className="rankedtyperacer">
                    <span className="rankedUserText">{typeracertext.substring(0, characterCount + 1)}</span>{typeracertext.substring(characterCount + 1, typeracertext.length)}
                </div>

                <div className="countingField">
                    {(cantType === false) &&
                        <span className="countdown countdownduring">{getCounter()} </span>}
                    {(cantType === true) && (
                        <span className="countdown before">{getCounter()} </span>)}
                </div>
            </div>

            <div className="box DD">
                <div className="opponentProfile">
                    <div className="picture">
                        <img src={require('./images/profile-picture.jpg')} />
                    </div>

                    <div className="rank">
                        <img src={require('./images/cheetah.png')} />
                    </div>

                    <div className="username">
                        Your Opponent  <br /> W:220 <br /> L:80 <br /> WLWWW
                    </div>

                    <div className="joinedOn">
                        Joined: 20 Oct. 2022
                    </div>
                </div>
            </div>

            <div className="box EE">
                {Game()}
            </div>

            <div className="box FF">
                <div className="race-tracker">
                    <div className="username1">
                        ApooBG
                    </div>

                    <div className="progress1">
                        <img src={require('./images/rabbit.png')} style={{ left: progressOfUser(percentageOfText()) + '%' }} />
                        <hr />
                    </div>


                    <div className="finishedText1">
                        {percentageOfText()}
                    </div>


                    <div className="username2">
                        ApooBG
                    </div>

                    <div className="progress2">
                        <img src={require('./images/rabbit.png')} style={{ left: progressOfUser(percentageOfText()) + '%' }} />
                        <hr />
                    </div>


                    <div className="finishedText2">
                        {percentageOfText()}
                    </div>

                </div>
            </div>

            <div className="GG">
                <div className="stats">
                    <div className="p1Result">1</div>
                    <div className="textStat">Stats</div>
                    <div className="p2Result">2</div>
                    <div className="p1Stats"> WPM: 113 <br /> Accuracy: 93% <br /> Total Score 1092p.</div>
                    <div className="verticalLine"></div>
                    <div className="p2Stats"> WPM: 113 <br /> Accuracy: 93% <br /> Total Score 1092p.</div>
                </div>
            </div>
        </div>
    );
}

export default Ranked;