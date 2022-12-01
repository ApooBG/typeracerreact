import React, { Component } from 'react';
import './Chat.css';
import io from 'socket.io-client'
import Text from 'react-dom';
import { useState, useRef, useEffect } from 'react';
const socket = io.connect("http://localhost:3001");
export default function Chat() {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    var username = "ApooBG";

    const sendMessage = () => {
        console.log(message);
        socket.emit("send_message", { message });
    };


    const renderChat = () => {
        return (
            chat.map(msg => {
                return (
<a><Text>{msg.message['message']}<br /></Text></a>
                )
            })
        )
    }

    useEffect(() => {
        socket.on("receive_message", message => {
        console.log(chat);
            setChat(prevState => [...prevState, { message }]);
        });
    }, [socket])


    return (
        <div className="chat">
            <div className="messageBox"><a>Messages:</a></div>

            <div className="messages">
                {renderChat()}
            </div>

            <div className="userInput">
                <input placeholder="Message..." onChange={(event) => {
                    setMessage(username + ": " + event.target.value);
                }}
                />
            </div>

            <div className="buttonSend">
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>

    )
}