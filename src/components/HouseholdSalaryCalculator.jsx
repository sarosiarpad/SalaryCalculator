import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  
  const [activeMember, setActiveMember] = useState();

  const handleTabChange = (name) => {
    setActiveMember(name);
  };

  return (
    <>
      <header>
        <FamilyMemberTabs setActiveMember={handleTabChange} />
      </header>
      <main className="flex flex-row">
        <SalaryCalculator activeMember={activeMember}/>
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;