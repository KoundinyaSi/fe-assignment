"use client"

import {useState, useEffect, useContext} from 'react';
import {MyContext} from '@/context/MyContext';

export default function landingPage (){
const {allSkills, skillsVerified} = useContext(MyContext); 
    return(
        <main className="flex min-h-screen flex-col p-24">
            <h1>Good afternoon, User</h1>
            <a href='/skills-verification'>
            <button className="border-2 border-black p-1 w-30 bg-blue-300">
              Skills feedback
              <span className="relative text-xs bottom-1 pl-10">{skillsVerified}/{allSkills.length} skills verified </span>
              </button>
            </a>
        </main>
    )
}