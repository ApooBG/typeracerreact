import './Login.css';
import Cookies from 'universal-cookie';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import Navbar from './Navbar';
import io from 'socket.io-client'
import { Navigate } from "react-router-dom";
import Ranked from "./Ranked";
import App from "./App";
const Login = () => {

    const[Username, setUsername] = useState("");
    const[Password, setPassword] = useState("");
    const[user, setUser] = useState();

    const UpdateUsername = (e) => {
        setUsername(e.target.value);
    }

    const UpdatePassword = (e) => {
        setPassword(e.target.value);
    }

    let LoginNow = () => {
        const url = "http://localhost:8080/FindUser?username=" + Username + "&password=" + Password;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
            console.log(data);
        })
        if (user.ID > 0)
        {
            console.log("dsa");
            const cookies = new Cookies();
        cookies.set('UserID', user.ID, { path: '/' });
        window.location.pathname = "/";
        }
        
    }

    return (
      <div className="wrapper-login">
             <input className="UsernameInp" placeholder="Username" onChange={e => UpdateUsername(e)}></input>
             <input className="PasswordInp" placeholder="Password" onChange={e => UpdatePassword(e)}></input>
             <button className="LoginBn" onClick={LoginNow}>Login</button>
    </div>  
       
    );
}

export default Login;