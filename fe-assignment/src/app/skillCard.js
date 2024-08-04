"use client";

export default function SkillCard({ skill }) {
  return (
    <div>
      <h1 className="font-extrabold text-3xl mb-4">{skill.name}</h1>
      <h4>{skill.description}</h4>
      <div className="border-2 mt-10 border-black">
        <div className="flex align-start justify-start border-b-2 border-black w-full p-4">
          <span className="mr-20 ml-4 w-5">Level</span>{" "}
          <span className="ml-5">Description</span>
        </div>
        {skill.skill_levels.map((lev) => {
          return (
            <div key={lev.id} className="flex items-center border-b-2 border-black w-full">
              <span className="mr-20 ml-4 w-5 p-5">{lev.skill_level_mark}</span>
              <input className="w-full h-full p-5" disabled defaultValue={lev.skill_level_description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
