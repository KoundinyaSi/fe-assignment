"use client";

export default function SkillCard({ skill }) {
  return (
    <div>
      <h1>{skill.name}</h1>
      <h4>{skill.description}</h4>
      <div>
        {skill.skill_levels.map((lev) => {
          return (
            <div key={lev.id}>
              {lev.skill_level_mark}: <span>{lev.skill_level_description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
