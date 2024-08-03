"use client";

import { useState, useEffect } from "react";
import { skillsData } from "./data";
import SkillCard from "./skillCard";

export default function Home() {
  const [data, setData] = useState(skillsData);
  const [skillSets, setSkillsets] = useState(skillsData.data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
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
        skillSets.length > 0 && (
          skillSets.map((skillset) => {
        return skillset.skills.map((skill) => {
          return <SkillCard key={skill.id} skill={skill} />;
        });
      })
        )
      )}
      <div></div>
    </main>
  );
}
