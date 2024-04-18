import React, { Children, useEffect } from "react";
import Discounts from "./components/Discounts";
import SalaryInput from "./components/SalaryInput";
import NameInput from "./components/NameInput";

const SalaryCalculator = (props) => {
  const name = props.name;
  const brutto = props.brutto;
  const netto = props.netto;
  const discounts = props.discounts;
  const {under25, justMarried, personal, family} = props.discounts;
  const handleName = props.handleName;
  const handleBrutto = props.handleBrutto;
  const handleNetto = props.handleNetto;
  const handleDiscounts = props.handleDiscounts;

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
    handleNetto(Math.round(nettoSalary));
  };

  useEffect(() => {
    calculateNettoSalary();
  }, [brutto, discounts]);

  return (
    <div>
      <NameInput 
        name={name}
        handleName={handleName}
      />
      <SalaryInput
        brutto={brutto}
        handleBrutto={handleBrutto}
      />
      <Discounts 
        discounts={discounts}
        handleDiscounts={handleDiscounts}
      />
      <p>A nettó bér: {netto}</p>
    </div>
  );
};

export default SalaryCalculator;