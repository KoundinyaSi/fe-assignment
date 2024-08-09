'use client';

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjhjMTg5MTYxLTMyNjYtNGJkNy05ZDNlLTM3ZjMzNzk0YTkxNiIsInNjb3BlIjpbIkdVRVNUIiwiU0tJTExfVkFMSURBVE9SIl0sImlhdCI6MTcyMzIwMjY3MSwiZXhwIjoxNzIzMjg5MDcxfQ.3iSRfuHisoQFGFXe2eoIeDExG-rXOHjGyYjFkk6JYx4`;
const apiDataUrl = "https://api-dev.proofofskill.org/v1.0.0/api/entity/skill-validators/associated-skillsets";
const entityId = `8c189161-3266-4bd7-9d3e-37f33794a916`;
const apiFeedbackUrl = `https://api-dev.proofofskill.org/v1.0.0/api/assessment/skill-level-feedback`;

// Create a context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
    const [state, setState] = useState('Initial Value');
    const [data, setData] = useState();
    const [skillSets, setSkillsets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [allSkills, setAllSkills] = useState([]);
    const [skillLevelFeedback, setSkillLevelFeedback] = useState({
      skill_level_updates: [
        {
          skill_level_id: "",
          feedback: "",
          looks_good: true
        }
      ]
    })
    const [skillsVerified, setSkillsVerified] = useState(0);
    useEffect(() => {
        const fetchData = async () => {  
        try{
          const response = await axios({
            method: 'get',
            baseURL: apiDataUrl,
            headers : {
              'Authorization': `Bearer ${token}`
            },
          });
          console.log(response.data)
          setData(response.data.data);
          setDataFetched(true);
          console.log(response.data.data.skillsets);
          // setData(respon.data);
          console.log(data);
          setSkillsets([...response.data.data.skillsets]);
          console.log(skillSets)
          console.log(data);
          let allSkillsArr = [];
          response.data.data.skillsets.map((skillSet) => {
            console.log(skillSet.skills)
            skillSet.skills.map((skill) => {
              allSkillsArr.push(skill);
            })
            });
          console.log(allSkillsArr)
          setAllSkills(allSkillsArr)
            if(!response.ok){
              throw new Error("Failed to fetch data");
            }
           setDataFetched(true);
        }catch(error){
          console.log("Error occured: ", error)
        }
      }
      if(!dataFetched){
        fetchData();
      }    
      },[])

     
      // setAllSkills(allSkillsArr);

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

      const handleSubmitSkill = async() => {
        let tempSkillLevelFeedbackArr = []
        console.log(allSkills[currentIndex])
        allSkills[currentIndex].skill_levels.map((skill_level) => {
          tempSkillLevelFeedbackArr.push({
            skill_level_id: skill_level.id,
              feedback: "",
              looks_good: true
          })})

          console.log(tempSkillLevelFeedbackArr);
          try{
            const res = await axios({
            method: 'post',
            baseURL: apiFeedbackUrl,
            headers : {
              'Authorization': `Bearer ${token}`
            },
            data: {
              "skill_validator_entity_id":"8c189161-3266-4bd7-9d3e-37f33794a916",
              "skill_level_updates": tempSkillLevelFeedbackArr
            }
          }
        )
        console.log(res);
        setSkillsVerified(skillsVerified + 1);
      }catch(error){
        console.log("Error sending Feedback: ", error)
      }
      handleNext();
      }

      const handleTextChange = (e) => {
        e.target.innerHTML = e.target.value;
      }

      const handleEdit = async(e) => {
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
          let tempSkillLevelFeedbackArr = []
          // console.log(allSkills[currentIndex])
          // allSkills[currentIndex].skill_levels.map((skill_level) => {
           
          for(let i=0; i<5;i++){
            tempSkillLevelFeedbackArr.push({
              skill_level_id: allSkills[currentIndex].skill_levels[i].id,
                feedback: `${inputElems[i].value+ ' '}`,
                looks_good: false
            })
            allSkills[currentIndex].skill_levels[i].skill_level_description = inputElems[i].value 
          }
            try{
              const res = await axios({
              method: 'post',
              baseURL: apiFeedbackUrl,
              headers : {
                'Authorization': `Bearer ${token}`
              },
              data: {
                "skill_validator_entity_id":"8c189161-3266-4bd7-9d3e-37f33794a916",
                "skill_level_updates": tempSkillLevelFeedbackArr
              }
            }
          )
          console.log(res);
          setSkillsVerified(skillsVerified + 1);
          handleNext();
        }catch(error){
          console.log("Error sending Feedback: ", error)
        }
          
        
        }
      };

    return (
        <MyContext.Provider value={{ state, data, skillSets, currentIndex, showThankYou, dataFetched, allSkills, skillLevelFeedback, handleSubmitSkill, handleNext, handlePrev, handleEdit, handleTextChange, skillsVerified }}>
            {children}
        </MyContext.Provider>
    );
};