import './LookForRanked.css';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import Navbar from './Navbar';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");


const LookForRanked = () => {

    const [searchingGame, setSearchingGame] = useState(false);

    const [counter, setCounter] = useState(0);

    const toggleIsSearching = () => setSearchingGame(!searchingGame);

    const reset = () => {
        setCounter(0);
        setSearchingGame(!searchingGame);
    }

    useEffect(() => {
        console.log(counter);
        const interval = setInterval(() => {
            setCounter(counter + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [counter])

    const isSearchingForGame = () => {

        if (searchingGame == false) {
            return (<button onClick={reset} className="find-match">Find Match</button>)
        }

        else {
            return (<button onClick={toggleIsSearching} className="searching-match">Searching for match</button>)
        }
    }

    return (
        <div className="look-ranked-container">
            <div className="AA2 box">
                <nav>
                    <a href="/">Home</a>
                    <a href="/Profile">Profile</a>
                    <span class="currentPage"><a href="/LookForRanked">Ranked</a></span>
                    <a href="/Ranked">RealRanked</a>
                </nav>
            </div>
            <div className="BB2 box">
                <div className="profilePic">
                    <img src={require('./images/rabbit.png')} alt="idk" />
                </div>
                <div className="profileUsername">ApooBG</div>
                <div className="profileOptions">Options</div>
                <div className="profileLogOut">Log Out</div>
            </div>
            <div className="CC2 box">
                Last Games <div className="line"></div>

                <>
                    {(() => {
                        const arr = [];
                        for (let i = 0; i < 8; i++) {
                            arr.push(
                                <div className="LastGame">
                                    <div className="right">ApooBG</div>
                                    <div>&nbsp; vs &nbsp;</div>
                                    <div className="left">VenszBG</div>
                                    <div className="right">2</div>
                                    <div>-</div>
                                    <div className="left">1</div>
                                    <div className="left">112wpm</div>
                                    <div></div>
                                    <div className="right">109wpm</div>
                                </div>
                            );
                        }
                        return arr;
                    })()}
                </>
            </div>
            <div className="DD2 box">
                <div className="search-box">

                    {(searchingGame == true) &&
                        <div className="time-searching">Searching: {counter} sec</div>}


                    {isSearchingForGame()}


                    <div className="estimated-time">Estimated time: 01:23 min</div>
                    <div className="players-online">Players online: 53</div>
                </div>
            </div>
            <div className="EE2 box">
                <div className="rank">
                    <img src={require('./images/cheetah.png')} alt="idk" />
                </div>

                <div className="wins">W: 220</div>
                <div className="losses">L: 120</div>
                <div className="lastFive">WLWLWW</div>
                <div className="joined">Joined: 20 Oct. 2022</div>
            </div>
            <div className="FF2 box">
                <div className="Leaderboard">
                    <div className="text">Leaderboard <hr /></div>
                    <div className="rank"><img src={require('./images/cheetah.png')} alt="idk" /></div>
                    <div className="username">1.ApooBG </div>
                    <div>- 145 wpm</div>

                    <div className="rank"><img src={require('./images/cheetah.png')} alt="idk" /></div>
                    <div className="username">1.ApooBG </div>
                    <div>- 145 wpm</div>

                    <div className="rank"><img src={require('./images/cheetah.png')} alt="idk" /></div>
                    <div className="username">1.ApooBG </div>
                    <div>- 145 wpm</div>

                    <div className="rank"><img src={require('./images/cheetah.png')} alt="idk" /></div>
                    <div className="username">1.ApooBG </div>
                    <div>- 145 wpm</div>

                    <div className="rank"><img src={require('./images/cheetah.png')} alt="idk" /></div>
                    <div className="username">1.ApooBG </div>
                    <div>- 145 wpm</div>
                </div>
            </div>
        </div>
    );
}

export default LookForRanked;