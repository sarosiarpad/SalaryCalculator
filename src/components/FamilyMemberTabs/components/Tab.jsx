import React from "react";

const Tab = ({ member, handleClick, isActive }) => {
  return (
    <div
      onClick={() => handleClick(member)}
      className={isActive ? "bg-red-100" : "bg-green-100"}
    >
      {member.name}
    </div>
  );
};

export default Tab;
