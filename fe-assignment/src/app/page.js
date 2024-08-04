"use client";

import { useState, useEffect } from "react";
import { skillsData } from "./data";
import SkillCard from "./skillCard";

export default function Home() {
  const [data, setData] = useState(skillsData);
  const [skillSets, setSkillsets] = useState(skillsData.data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  let allSkills = [];
  skillSets.map((skillSet) => {
    allSkills.push(...skillSet.skills);
  });

  const handleNext = () => {
    if (currentIndex < allSkills.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowThankYou(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitSkill = () => {
    console.log("Skill ID: ",allSkills[currentIndex].id,"Skill name: ",allSkills[currentIndex].name," Looks good!")
    handleNext();
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      {showThankYou ? (
        <div>
          <h2>Thank you!</h2>
        </div>
      ) : (
        allSkills.length > 0 && (
          <SkillCard
            key={allSkills[currentIndex].id}
            skill={allSkills[currentIndex]}
          />
        )
      )}
      {!showThankYou && (
        <div className="flex justify-between">
          <div className="flex items-center w-full">
            <button
              className="place-self-start border-2 border-black p-1 w-20 m-4 ml-0"
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
              className="border-2 border-black p-1 w-30 m-4"
              onClick={handleSubmitSkill}
            >
              Looks good to me
            </button>
            <button
              className="border-2 border-black p-1 w-30"
            >
              Suggest Edits
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
