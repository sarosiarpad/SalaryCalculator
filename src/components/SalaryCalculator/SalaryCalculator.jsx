import React, { Children, useEffect } from "react";
import Discounts from "./components/Discounts";
import SalaryInput from "./components/SalaryInput";
import NameInput from "./components/NameInput";
import { Grid, GridColumn, GridRow, Label, Button } from "semantic-ui-react";

const SalaryCalculator = (props) => {
  const {
    name, 
    brutto, 
    netto,
    discounts,
    handleName,
    handleBrutto,
    handleNetto,
    handleDiscounts,
    deleteFamilyMember
  } = props;
  
  const {under25, justMarried, personal, family} = discounts;

  const calculateNettoSalary = () => {
    let bonus = 0;
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
      bonus += 5000;
    }
    // family discount
    if (family.toggled && family.dependents > 0) {
      if (family.dependents === 1) {
        bonus += 10000;
      } else if (family.dependents === 2) {
        bonus += 20000;
      } else if (family.dependents >= 3) {
        bonus += 33000;
      }
    }

    // personal
    if (personal.toggled) {
      tax -= tax > 77300 ? 77300 : tax;
    }
    handleNetto(Math.round(brutto-tax+bonus));
  };

  useEffect(() => {
    handleNetto(0);
    calculateNettoSalary();
  }, [brutto, discounts]);

  return (
    <div className="flex flex-col w-4/6 bg-blue-100 p-5 rounded-lg">
      <div className="flex flex-row justify-between w-full mb-5">
        <h2 className="font-bold text-2xl">{name} bérének kiszámítása</h2>
        <Button color='blue' icon="trash" onClick={deleteFamilyMember} />
      </div>
      <Grid columns={1} className="w-full items-center">
        <GridColumn className="space-y-5">
          <GridRow>
            <div className="flex justify-start">
              <NameInput 
                name={name}
                handleName={handleName}
              />
            </div>
          </GridRow>
          <GridRow >
            <div className="flex">
              <SalaryInput
                brutto={brutto}
                handleBrutto={handleBrutto}
              />
            </div>
          </GridRow>
          <GridRow >
            <div className="flex">
              <Discounts 
                discounts={discounts}
                handleDiscounts={handleDiscounts}
              />
            </div>
          </GridRow>
          <GridRow >
            <div className="flex flex-col w-fit mt-10">
              <p className=" font-bold text-lg">Számított nettó bér:</p>
              <Label horizontal color="blue" size="huge">{netto}</Label>
            </div>
          </GridRow>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default SalaryCalculator;