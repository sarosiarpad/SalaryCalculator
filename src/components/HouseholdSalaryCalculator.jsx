import React, { useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {

  const [activeMember, setActiveMember] = useState({
    id: 1,
    name: "John",
    brutto: 0,
    netto: 0,
    discounts: {
      under25: { toggled: false },
      justMarried: { toggled: false, date: "", approved: false },
      personal: { toggled: false },
      family: { toggled: false, children: 0, dependents: 0 },
    },
  });

  const handleName = (name) => {
    setActiveMember(prevState => ({
      ...prevState,
      name: name
    }));
  };
  const handleBrutto = (brutto) => {
    setActiveMember(prevState => ({
      ...prevState,
      brutto: brutto
    }));
  };
  const handleNetto = (netto) => {
    setActiveMember(prevState => ({
      ...prevState,
      netto: netto
    }));
  };
  const handleDiscounts = (discounts) => {
    setActiveMember(prevState => ({
      ...prevState,
      discounts: discounts
    }));
  };

  return (
    <>
      <header>
        <FamilyMemberTabs
          setCurrentUser={setActiveMember}
          activeMember={activeMember}
        />
      </header>
      <main>
        <SalaryCalculator
          name={activeMember.name}
          brutto={activeMember.brutto}
          netto={activeMember.netto}
          discounts={activeMember.discounts}
          handleName={handleName}
          handleBrutto={handleBrutto}
          handleNetto={handleNetto}
          handleDiscounts={handleDiscounts}
        />
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
