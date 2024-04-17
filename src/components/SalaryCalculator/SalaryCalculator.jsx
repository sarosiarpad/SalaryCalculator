import React, { Children, useEffect } from "react";
import Discounts from "./components/Discounts";
import SalaryInput from "./components/SalaryInput";
import NameInput from "./components/NameInput";

const SalaryCalculator = ({ user, handleUser }) => {

  const {name, brutto, discounts, netto} = user;

  const {under25, justMarried, personal, family} = discounts;

  const handleNameChange = ({ name }) => {
    handleUser({ name: name });
  }
  const handleBruttoChange = ({ brutto }) => {
    handleUser({ brutto: brutto });
  }

  const handleDiscounts = ({ discounts }) => {
    handleUser({ discounts: { ...user.discounts, ...discounts } });
  };

  

  const calculateNettoSalary = () => {
    let nettoSalary = brutto;

    // TB
    nettoSalary -= brutto * 0.185;

    // under25
    if (under25.toggled) {
      if (brutto >= 499952) {
        nettoSalary -= (brutto - 499952) * 0.15;
      }
    }else{
      nettoSalary -= brutto * 0.15
    }
    // personal
    if (!personal.toggled) {
      nettoSalary -= 77300;
      if (nettoSalary < 0) {
        nettoSalary = 0;
      }
    }
    // justMarried
    if (justMarried.toggled && justMarried.approved) {
      nettoSalary += 5000;
    }
    // family discount
    if (family.toggled && family.dependents > 0) {
      if (family.dependents === 1) {
        nettoSalary += 10000;
      } else if (family.dependents === 2) {
        nettoSalary += 20000;
      } else if (family.dependents >= 3) {
        nettoSalary += 33000;
      }
    }
    onCurrentUserDataChange({ ...currentUser, netto: Math.round(nettoSalary) });
  };

  return (
    <div>
      <NameInput 
        name={name}
        onNameChange={handleNameChange}
      />
      <SalaryInput
        brutto={brutto}
        onBruttoChange={handleBruttoChange}
      />
      <Discounts discounts={discounts} handleDiscounts={handleDiscounts}/>
      <p>A nettó bér: {netto}</p>
    </div>
  );
};

export default SalaryCalculator;
