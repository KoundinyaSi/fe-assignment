"use client"

import {useState, useEffect} from 'react';

export default function landingPage (){

    return(
        <main className="flex min-h-screen flex-col p-24">
            <h1>Good afternoon, User</h1>
            <a href='/skills-verification'>
            <button className="border-2 border-black p-1 w-30 bg-blue-300">
              Skills feedback
              </button>
            </a>
        </main>
    )
}