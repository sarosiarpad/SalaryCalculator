import React, { useState } from 'react';
import { Input, Label } from 'semantic-ui-react';


const SalaryInput = ({ brutto, onBruttoChange }) => {

  return ( 
    <div className='flex flex-col w-80'>
      <h3>Bruttó bér</h3>
      <Input
        labelPosition='right'
        type='number'
        placeholder='Amount'
        value={brutto}
        onChange={onBruttoChange}
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
        onChange={onBruttoChange}
      />
      <p>Add meg a bruttó béredet!</p>
    </div>
  );     
}
 
export default SalaryInput;