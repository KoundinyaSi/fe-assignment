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
        <button onClick={handleNext}>Next</button>
      )}
    </main>
  );
}
