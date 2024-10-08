"use client";


import { useState, useEffect, useContext } from "react";
import { MyContext } from "@/context/MyContext";


export default function SkillCard({ skill }) { 
const {handleTextChange} = useContext(MyContext);
  return (
    <div>
      <h1 className="font-extrabold text-3xl mb-4">{skill.name}</h1>
      <h4>{skill.description}</h4>
      <div className="border-2 mt-10 border-black">
        <div className="bg-stone-300 flex align-start justify-start border-b-2 border-black w-full p-4">
          <span className="mr-20 ml-4 w-5 font-bold">Level</span>{" "}
          <span className="ml-5 font-bold">Description</span>
        </div>
        {skill.skill_levels.map((lev) => {
          return (
            <div key={lev.id} className="bg-stone-200 flex items-center border-b-2 border-black w-full">
              <span className="mr-20 ml-4 w-5 p-5 font-semibold">{lev.skill_level_mark}</span>
              <input id={lev.id} className="w-full h-full p-5 font-semibold bg-stone-200" disabled defaultValue={lev.skill_level_description} onChange={handleTextChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
