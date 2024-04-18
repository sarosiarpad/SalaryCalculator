import React, { useState } from "react";
import Tab from "./components/Tab";
import { Button, Icon } from 'semantic-ui-react'

const FamilyMemberTabs = ({ setCurrentUser, activeMember }) => {

  const [familyMembers, setFamilyMembers] = useState([
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
  ]);

  const handleTabClick = (clickedMember) => {
    setCurrentUser(clickedMember);
    updateFamilyMember(activeMember); // Az aktív tag adatainak frissítése
  };

  const updateFamilyMember = (updatedMember) => {
    setFamilyMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  const addFamilyMember = () => {
    setFamilyMembers(prevMembers => {
      const newMember = {
        id: familyMembers.length + 1, // Az új tag azonosítója legyen a jelenlegi hossz plusz egy
        name: "New Member",
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
            dependents: 0, // Helyesírási hiba: dependents helyett
          },
        },
      };
      return prevMembers.concat(newMember); // Az új tag hozzáadása a jelenlegi tagokhoz
    });
  };

  return (
    <div className="flex felx-row gap-5">
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
      <Button onClick={addFamilyMember} icon="add" />
    </div>
    
  );
};

export default FamilyMemberTabs;
