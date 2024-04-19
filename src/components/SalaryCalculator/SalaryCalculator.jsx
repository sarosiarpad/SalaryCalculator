import React, { Children, useEffect } from "react";
import Discounts from "./components/Discounts";
import SalaryInput from "./components/SalaryInput";
import NameInput from "./components/NameInput";

const SalaryCalculator = (props) => {
  const {
    name, 
    brutto, 
    netto,
    discounts,
    handleName,
    handleBrutto,
    handleNetto,
    handleDiscounts
  } = props;
  
  const {under25, justMarried, personal, family} = discounts;

  const calculateNettoSalary = () => {
    let netto = brutto;
    let tax = 0;

    // TB
    tax = brutto * 0.185;

    // under25
    if (under25.toggled) {
      if (brutto >= 499952) {
        tax += (brutto - 499952) * 0.15;
      }
    }else{
      tax += brutto * 0.15
    }

    // justMarried
    if (justMarried.toggled && justMarried.approved) {
      netto += 5000;
    }
    // family discount
    if (family.toggled && family.dependents > 0) {
      if (family.dependents === 1) {
        netto += 10000;
      } else if (family.dependents === 2) {
        netto += 20000;
      } else if (family.dependents >= 3) {
        netto += 33000;
      }
    }

    console.log(tax);
    // personal
    if (personal.toggled) {
      tax -= tax > 77300 ? 77300 : tax;
    }
    handleNetto(Math.round(netto-tax));
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