import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  
  const [activeMember, setActiveMember] = useState();
  const [activeBruttoSalary, setActiveBruttoSalary] = useState(0);

  const handleTabChange = (name, salary) => {
    setActiveMember(name);
    setActiveBruttoSalary(salary);
  };

  return (
    <>
      <header>
        <FamilyMemberTabs setActiveMember={handleTabChange} />
      </header>
      <main className="flex flex-row h-full">
        <SalaryCalculator 
          onChange = {handleTabChange}
          activeMember={activeMember} 
          activeBruttoSalary={activeBruttoSalary}
        />
        <HouseholdSummary/>
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
