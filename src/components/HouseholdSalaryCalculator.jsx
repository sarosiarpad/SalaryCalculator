import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {

  const [user, setUser] = useState({
    name: "",
    brutto: 0,
    discounts: {
      under25: {
        toggled: false
      },
      justMarried: {
        toggled: true,
        date: '',
        approved: false,
      },
      personal: {
        toggled: false
      },
      family: {
        toggled: false,
        children: 0,
        dependets: 0
      }
    },
    netto: 0
  });

  const handleUser = (props) => {
    setUser(prevUser => ({
      ...prevUser,
      ...props
    }));
  };
  
  return (
    <>
      <header>
        <FamilyMemberTabs />
      </header>
      <main>
        <SalaryCalculator user={user} handleUser={handleUser}/>
        <HouseholdSummary/>
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
