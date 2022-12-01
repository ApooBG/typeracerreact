import './Profile.css';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import Navbar from './Navbar';
import io from 'socket.io-client'
import Chat from './Chat'
import Cookies from 'universal-cookie';


const socket = io.connect("http://localhost:3001");

const Profile = () => {
    const [user, setUser] = useState([]);

    const [getStats, setGetStats] = useState(false);

    const toggleProfileStats = () => setGetStats(!getStats);

    const getProfileStats = () => {
        if (getStats == false) {
            return (
                <div className="profile-box-z profile-box-z-hidden">
                    <div className="hideProfile"><button onClick={toggleProfileStats}><a>{">"}</a></button></div>
                </div>
            )
        }

        else if (getStats == true) {
            return (
                <div className="profile-box-z-show">
                    <div className="showProfile"><button onClick={toggleProfileStats}><a>{"<"}</a></button></div>
                </div>
            )
        }
    }
    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get('UserID') == null)
        {
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
    return (
        <div className="profile-wrapper ">
            <div className="profile-navbar">
                <nav>
                    <a href="/">Home</a>
                    <span class="currentPage"><a href="/Profile">Profile</a></span>
                    <a href="/LookForRanked">Ranked</a>
                    <a href="/Ranked">RealRanked</a>
                </nav>
            </div>
            <div className="box b">
                <div className="profilePic">
                    <img src={require('./images/rabbit.png')} />
                </div>
                <div className="profileUsername">ApooBG</div>
                <div className="profileOptions">Options</div>
                <div className="profileLogOut">Log Out</div>
            </div>

            {getProfileStats()}

            <div className="profile-box-c">
                <div className="profile-change">
                    <div className="picture">
                        <img src={require('./images/profile-picture.jpg')} />
                    </div>

                    <div className="rank">
                        <img src={require('./images/cheetah.png')} />
                    </div>

                    <div className="info">
                        <div>Username: {user.Username} </div>
                        <div>Email: {user.Email}</div>
                        <div>Password: {user.Password}</div>
                        <div>Age: {user.Age} years old</div>
                        <div>From: {user.Country}</div>
                    </div>
                    <div> <button>Edit Info</button></div>

                </div>
            </div>

            <div className="profile-box-d">
                <div className="Customize">
                    <div><img src={require('./images/rabbit.png')} /></div>
                    <div><img src={require('./images/bear.png')} /></div>
                    <div><img src={require('./images/crocodile.png')} /></div>
                    <div><img src={require('./images/dolphin.png')} /></div>
                    <div><img src={require('./images/eagle.png')} /></div>
                    <div><img src={require('./images/fox.png')} /></div>
                    <div><img src={require('./images/ostrich.png')} /></div>
                    <div><img src={require('./images/raccoon.png')} /></div>
                    <div><img src={require('./images/snake.png')} /></div>
                    <div><img src={require('./images/tiger.png')} /></div>
                    <div><img src={require('./images/turtle.png')} /></div>
                    <div><img src={require('./images/locked.png')} /></div>
                </div>
            </div>

            <div className="profile-box-e">
                <Chat />
            </div>
        </div>
    );
}

export default Profile;