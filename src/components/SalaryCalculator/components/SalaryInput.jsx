import React from 'react';
import { Input, Label } from 'semantic-ui-react';

const SalaryInput = (props) => {
  const brutto = props.brutto;
  const handleBrutto = props.handleBrutto;

  const handleInputChange = (event) => {
    handleBrutto(event.target.value);
  };

  const handleRangeChange = (event) => {
    handleBrutto(event.target.value);
  };

  return (
    <div className='flex flex-col w-80'>
      <h3>Bruttó bér</h3>
      <Input
        labelPosition='right'
        type='number'
        placeholder='Amount'
        value={brutto}
        onChange={handleInputChange}
      >
        <input />
        <Label basic>Ft</Label>
      </Input>
      <input 
        type="range" 
        min="100000" 
        max="1000000" 
        step="1000"
        value={brutto}
        onChange={handleRangeChange}
      />
      <p>Add meg a bruttó béredet!</p>
    </div>
  );
}

export default SalaryInput;
