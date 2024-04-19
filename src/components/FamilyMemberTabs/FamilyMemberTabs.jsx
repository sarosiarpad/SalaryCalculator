import React, { useState } from "react";
import Tab from "./components/Tab";
import { Button, Icon } from 'semantic-ui-react'

const FamilyMemberTabs = (props) => {

  const {familyMembers, activeMember, addFamilyMember, handleActiveMember} = props;

  return (
    <div className="flex felx-row gap-5">
      <div className="flex flex-row gap-2">
        {familyMembers.map((member) => (
          <Tab
            key={member.id}
            member={member}
            handleClick={handleActiveMember}
            isActive={activeMember && activeMember.id === member.id}
          />
        ))}
      </div>
      <Button onClick={addFamilyMember} icon="add" />
    </div>
    
  );
};

export default FamilyMemberTabs;
