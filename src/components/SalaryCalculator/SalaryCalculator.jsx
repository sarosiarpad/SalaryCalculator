import React, { useState } from 'react';

const SalaryCalculator = ({ activeMember }) => {
  const [salary, setSalary] = useState(0); // Állapot a bér inputhoz
  const handleSalaryChange = (e) => setSalary(e.target.value); // Állapot frissítése a csúszka változásakor

  return (
    <div className="bg-slate-100">
      <h1>{activeMember} bérének kiszámítása</h1>
      <div className="">
        <div className='flex flex-col'>
          <label htmlFor="name">Családtag neve</label>
          <input name="name" type="text" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="salary">Bruttó bér</label>
          <input
            name="salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <input
            type="range"
            min="100000"
            max="10000000"
            value={salary}
            onChange={handleSalaryChange}
          />
          <div>
            <button onClick={() => setSalary(Math.round(salary*0.95))}>-5</button>
            <button onClick={() => setSalary(Math.round(salary*0.99))}>-1</button>
            <button onClick={() => setSalary(Math.round(salary*1.01))}>+1</button>
            <button onClick={() => setSalary(Math.round(salary*1.05))}>+5</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
