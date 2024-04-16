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

  const [aprrovedMarrige, setAprrovedMarrige] = useState(false)
  
  const [dependents, setDependents] = useState(0);

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
  };

  const handleApprovedMarrige = (value) => {
    setAprrovedMarrige(value);
  }

  const calculateNettoSalary = () => {
    let nettoSalary = brutto;
  
    // SZJA
    nettoSalary -= brutto * 0.15;
  
    // TB
    nettoSalary -= brutto * 0.185;
  
    // under25
    if (discounts.under25) {
      if (brutto <= 499952) {
        nettoSalary += brutto * 0.15;
      } else {
        nettoSalary += (brutto - 499952) * 0.15;
      }
    }
  
    // personal
    if (discounts.personal) {
      nettoSalary -= 77300;
      if (nettoSalary < 0) {
        nettoSalary = 0;
      }
    }

    // justMarried
    if (discounts.justMarried && aprrovedMarrige) {
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
    calculateNettoSalary();
  }, [brutto, discounts, dependents, aprrovedMarrige]);

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
        approvedMarrige={aprrovedMarrige}
        onApprovedMarrigeChange={handleApprovedMarrige}
      />
       <p>A nettó bér: {netto}</p>
    </div>
  );
};

export default SalaryCalculator;