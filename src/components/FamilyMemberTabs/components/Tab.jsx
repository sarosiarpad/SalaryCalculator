import React from "react";
import { Label, Icon, Button } from "semantic-ui-react";

const Tab = ({ member, handleClick, isActive }) => {
  return (
    <Label
      onClick={() => handleClick(member)}
      color={isActive ? 'green' : 'grey'}
      size="large"
      className="cursor-pointer"
    >
      {member.name}
    </Label>
  );
};

export default Tab;
