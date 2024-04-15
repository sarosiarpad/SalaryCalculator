import React, { useState } from "react";
import { Form, FormField, Checkbox, Button, Input } from "semantic-ui-react";

const SalaryCalculator = ({ onChange, activeMember, activeBruttoSalary }) => {

  const calculateNettoSalary = (salary) => {

  }

  const handleInputChange = (e) => {
    onChange(activeMember, e.target.value);
  };

  return (
    <div className="flex flex-col justify-center">
      <h2>{activeMember} bérének kiszámítása!</h2>
      <Form>
        <FormField>
          <label>Családtag neve</label>
          <input
            type="text" 
            placeholder={activeMember}
          />
        </FormField>
        <FormField>
          <label>Bruttó bér</label>
          <Input
            type="number"
            value={activeBruttoSalary}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={() => setBruttoSalary(Math.round(activeBruttoSalary - activeBruttoSalary * 0.05))}>-5%</Button>
            <Button onClick={() => setBruttoSalary(Math.round(activeBruttoSalary - activeBruttoSalary * 0.01))}>-1%</Button>
            <Button onClick={() => setBruttoSalary(Math.round(activeBruttoSalary + activeBruttoSalary * 0.01))}>+1%</Button>
            <Button onClick={() => setBruttoSalary(Math.round(activeBruttoSalary + activeBruttoSalary * 0.05))}>+5%</Button>
            <input
              type="range"
              min={100000}
              max={1000000}
              value={activeBruttoSalary}
              onChange={handleInputChange}
              step={10000}
              style={{ flex: 1, marginLeft: "10px" }}
            />
          </div>
        </FormField>
      </Form>
    </div>
  );
};

export default SalaryCalculator;
