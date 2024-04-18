import React from "react";
import { Checkbox } from "semantic-ui-react";

const DiscountOption = (props) => {
  const label = props.label;
  const checked = props.checked;
  const onChange = props.onChange;
  const onChecked = props.onChecked;

  return (
    <div className="flex items-center">
      <Checkbox 
        toggle
        label={label}
        checked={checked}
        onChange={onChange}
      />
      {checked && onChecked && onChecked()}
    </div>
  );
}

export default DiscountOption;
