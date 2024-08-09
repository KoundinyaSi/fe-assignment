"use client";

import { useState, useEffect } from "react";
import { skillsData } from "./data";
import SkillCard from "./skillCard";

const apiUrl = "https://api-dev.proofofskill.org/v1.0.0/api/entity/skill-validators/associated-skillsets";

export default function Home() {

  useEffect(() => {
    // try{
    //     fetch(apiUrl)

    // }catch(error){
    //   console.log("Error occured: ", error)
    // }
  },[])

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
    console.log(
      "Skill ID: ",
      allSkills[currentIndex].id,
      "Skill name: ",
      allSkills[currentIndex].name,
      " Looks good!"
    );
    handleNext();
  };

  const handleEdit = (e) => {
    let inputElems = document.querySelectorAll("input");
    if (e.target.innerHTML === "Suggest Edits") {
      e.target.innerHTML = "Save";
      e.target.style.background = 'rgb(190 242 100)'
      document.querySelector("#submit-btn").style.visibility = "hidden";
  
      inputElems.forEach((elem) => {
        elem.disabled = false;
      });

    } else if (e.target.innerHTML === "Save") {
      e.target.innerHTML = "Suggest Edits";
       e.target.style.background = 'rgb(248 113 113)'
      document.querySelector("#submit-btn").style.visibility = "visible";
      inputElems.forEach((elem) => {
        elem.disabled = true;
      });
      for(let i=0; i<5;i++){
        allSkills[currentIndex].skill_levels[i].skill_level_description = inputElems[i].value 
      }
      console.log("Skills updated: ", allSkills[currentIndex].skill_levels)
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
