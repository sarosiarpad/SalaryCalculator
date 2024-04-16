import React, { useState, useEffect } from "react";
import Discounts from "./components/Discounts";
import SalaryInput from "./components/SalaryInput";
import NameInput from "./components/NameInput";

const SalaryCalculator = () => {
  const [name, setName] = useState();

  const [brutto, setBrutto] = useState(0);

  const [netto, setNetto] = useState(0);

  const [discounts, setDiscounts] = useState({
    under25: false,
    justMarried: false,
    personal: false,
    family: false
  });
  
  const [dependents, setDependents] = useState(0); // Eltartottak száma

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleBruttoChange = (event) => {
    setBrutto(event.target.value);
  }

  const handleDiscountChange = (discount) => {
    setDiscounts({ ...discounts, [discount]: !discounts[discount] });
  };

  const handleDependentsChange = (value) => {
    setDependents(value);
    console.log(dependents);
  };

  const calculateNettoSalary = () => {
    let nettoSalary = brutto;
  
    // SZJA
    nettoSalary -= brutto * 0.15;
  
    // TB
    nettoSalary -= brutto * 0.185;
  
    // under25 Discount
    if (discounts.under25) {
      if (brutto <= 499952) {
        nettoSalary += brutto * 0.15;
      } else {
        nettoSalary += (brutto - 499952) * 0.15;
      }
    }
  
    // personal discount
    if (discounts.personal) {
      nettoSalary -= 77300;
      if (nettoSalary < 0) {
        nettoSalary = 0;
      }
    }
  
    // justMarried discount
    if (discounts.justMarried) {
      nettoSalary += 5000;
    }
  
    // family discount
    if (dependents > 0) {
      if (dependents === 1) {
        nettoSalary += 10000;
      } else if (dependents === 2) {
        nettoSalary += 20000;
      } else if (dependents >= 3) {
        nettoSalary += 33000;
      }
    }
  
    setNetto(Math.round(nettoSalary));
  };

  useEffect(() => {
    console.log("szia");
    calculateNettoSalary();
  }, [brutto, discounts, dependents]);

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
      <Discounts 
        discounts={discounts}
        onDiscountChange={handleDiscountChange}
        dependents={dependents}
        onDependentsChange={handleDependentsChange}
      />
       <p>A nettó bér: {netto}</p>
    </div>
  );
};

export default SalaryCalculator;