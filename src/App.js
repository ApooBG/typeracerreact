import React from 'react';
import Navbar from "./Navbar";
import Ranked from './Ranked';
import Profile from './Profile';
import Home from "./Home"
import LookForRanked from './LookForRanked';
import Login from './Login';

const App = () => {
    let component
    switch (window.location.pathname) {
        case "/":
            component = <Home />
            break
        case "/LookForRanked":
            component = <LookForRanked />
            break
        case "/Profile":
            component = <Profile />
            break
        case "/Ranked":
            component = <Ranked />
            break;
            case "/Login":
                component = <Login />
                break;
        
    }
       return (
    <>
        {component}
    </>
       )
}

export default App;