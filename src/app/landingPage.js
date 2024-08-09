"use client"

import {useState, useEffect} from 'react';

export default function landingPage (){

    const loadSkillsPage = () => {
        console.log(window.location.href)
    }

    return(
        <main className="flex min-h-screen flex-col p-24">
            <h1>Good afternoon, User</h1>
            <button onClick={loadSkillsPage}>SKills feedback</button>
        </main>
    )
}