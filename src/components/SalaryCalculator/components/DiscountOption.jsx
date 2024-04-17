import React from "react";
import { Checkbox } from "semantic-ui-react";

const DiscountOption = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <Checkbox 
        toggle
        label={label}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default DiscountOption;