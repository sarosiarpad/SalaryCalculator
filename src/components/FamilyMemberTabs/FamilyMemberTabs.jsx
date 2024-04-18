import React from "react";
import Tab from "./components/Tab";

const FamilyMemberTabs = ({ setCurrentUser, activeMember }) => {
  const familyMembers = [
    { 
      id: 1,
      name: "John",
      brutto: 0,
      netto: 0,
      discounts: {
        under25: {
          toggled: false,
        },
        justMarried: {
          toggled: false,
          date: "",
          approved: false,
        },
        personal: {
          toggled: false,
        },
        family: {
          toggled: false,
          children: 0,
          dependets: 0,
        },
      }
    },
    { 
      id: 2,
      name: "Maria",
      brutto: 600000,
      netto: 0,
      discounts: {
        under25: {
          toggled: false,
        },
        justMarried: {
          toggled: false,
          date: "",
          approved: false,
        },
        personal: {
          toggled: false,
        },
        family: {
          toggled: false,
          children: 0,
          dependets: 0,
        },
      }
    }
  ];

  const handleTabClick = (member) => {
    setCurrentUser(member);
  };

  return (
    <div className="flex flex-row gap-2">
      {familyMembers.map((member) => (
        <Tab
          key={member.id}
          member={member}
          handleClick={handleTabClick}
          isActive={activeMember && activeMember.id === member.id}
        />
      ))}
    </div>
  );
};

export default FamilyMemberTabs;
