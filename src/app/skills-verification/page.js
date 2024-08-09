"use client";

import { useState, useEffect, useContext } from "react";
import SkillCard from "./skillCard";
import { MyContext } from "@/context/MyContext";


function SkillVerification() {

  const {data, skillSets, allSkills, currentIndex, showThankYou, dataFetched, skillLevelFeedback, handleSubmitSkill, handleNext, handlePrev, handleEdit} = useContext(MyContext);

  const allSkillsArr = allSkills;

 
  return (
    // <h1>Hello</h1>
    dataFetched && <main className="flex min-h-screen flex-col p-24">
      {showThankYou ? (
        <div>
          <h2>Thank you!</h2>
        </div>
      ) : (
        allSkillsArr.length > 0 && (
          <SkillCard
            key={allSkillsArr[currentIndex].id}
            skill={allSkillsArr[currentIndex]}
          />
        )
      )}
      {!showThankYou && (
        <div className="flex justify-between">
          <div className="flex items-center w-full">
            <button
              className={`place-self-start border-2 border-black p-1 w-20 m-4 ml-0 ${currentIndex === 0 ? 'bg-stone-300' : ''}`}
              disabled={currentIndex == 0}
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              className="place-self-start border-2 border-black p-1 w-20 mt-4"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          <div className="flex w-full items-center justify-end">
            <button
              id="submit-btn"
              className="border-2 border-black p-1 w-30 m-4 bg-green-400"
              onClick={handleSubmitSkill}
            >
              Looks Good to me
            </button>
            <button
              className="border-2 border-black p-1 w-30 bg-red-400"
              onClick={handleEdit}
            >
              Suggest Edits
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default SkillVerification;