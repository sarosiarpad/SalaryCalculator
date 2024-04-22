import React, { useEffect, useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { Segment, Grid, GridColumn, Divider } from "semantic-ui-react";

const HouseholdSalaryCalculator = () => {

  const [familyMembers, setFamilyMembers] = useState([
    { 
      id: 1,
      name: "New Member",
      brutto: 0,
      netto: 0,
      discounts: {
        under25: {
          toggled: false,
        },
        justMarried: {
          toggled: false,
          date: "",
          approved: false,
        },
        personal: {
          toggled: false,
        },
        family: {
          toggled: false,
          children: 0,
          dependets: 0,
        },
      }
    }
  ])
  const [activeMember, setActiveMember] = useState(familyMembers[0]);

  const updateFamilyMember = (updatedMember) => {
    setFamilyMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };
  const addFamilyMember = () => {
    const newMember = {
      id: familyMembers.length + 1,
      name: "New Member",
      brutto: 0,
      netto: 0,
      discounts: {
        under25: {
          toggled: false,
        },
        justMarried: {
          toggled: false,
          date: "",
          approved: false,
        },
        personal: {
          toggled: false,
        },
        family: {
          toggled: false,
          children: 0,
          dependents: 0,
        },
      },
    };
    setFamilyMembers(prevMembers => {
      const updatedMembers = prevMembers.concat(newMember);
      setActiveMember(updatedMembers[updatedMembers.length - 1]);
      return updatedMembers;
    });
  };

  const deleteActiveFamilyMember = () => {
    if(familyMembers.length > 1){
      setFamilyMembers(prevMembers => {
        const remainingMembers = prevMembers.filter(existingMember => existingMember.id !== activeMember.id);
        setActiveMember(remainingMembers[0]);
        return remainingMembers;
      });
    } else {
      familyMembers[0] = {
        id: 1,
        name: "New Member",
        brutto: 0,
        netto: 0,
        discounts: {
          under25: {
            toggled: false,
          },
          justMarried: {
            toggled: false,
            date: "",
            approved: false,
          },
          personal: {
            toggled: false,
          },
          family: {
            toggled: false,
            children: 0,
            dependets: 0,
          },
        }
      }
      setActiveMember(familyMembers[0]);
    }
  };

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
      discounts: {
        ...prevState.discounts,
        ...discounts
      }
    }));
  };

  useEffect(() => {
    updateFamilyMember(activeMember)
  }, [activeMember]);

  return (
    <>
      <header className="flex justify-center">
        <FamilyMemberTabs
          familyMembers={familyMembers}
          activeMember={activeMember}
          addFamilyMember={addFamilyMember}
          handleActiveMember={setActiveMember}
        />
      </header>
      <main>
        <Segment>
          <Grid columns={2}>
            <GridColumn>
            <div className="flex justify-end">
              {activeMember &&
              <SalaryCalculator
                  name={activeMember.name}
                  brutto={activeMember.brutto}
                  netto={activeMember.netto}
                  discounts={activeMember.discounts}
                  handleName={handleName}
                  handleBrutto={handleBrutto}
                  handleNetto={handleNetto}
                  handleDiscounts={handleDiscounts}
                  deleteFamilyMember={deleteActiveFamilyMember}
                />
              }
            </div>
            </GridColumn>
            <GridColumn>
            <div className="flex justify-start">
              <HouseholdSummary
                familyMembers={familyMembers}
              />
            </div>
            </GridColumn>
          </Grid>     
        </Segment>
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
