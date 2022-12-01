import React, { Component }  from 'react';
export default function Navbar() {
    return  (
            <nav>
                <a href="/">Home</a>
                <a href="/Profile">Profile</a>
                <span class="currentPage"><a href="/LookForRanked">Ranked</a></span>
                <a href="/Login">Login</a>

            </nav>
            
    )
}