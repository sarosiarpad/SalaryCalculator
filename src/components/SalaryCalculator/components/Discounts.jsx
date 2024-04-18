import React, { useState, useEffect, useReducer } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalActions, 
  Input, Button, 
  Label, 
} from "semantic-ui-react";
import DiscountOption from "./DiscountOption";


  function reducer(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()
    }
  }

const Discounts = (props) => {
  const discounts = props.discounts;
  const handleDiscounts = props.handleDiscounts;
  const {under25, justMarried, personal, family} = discounts;

  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  const handleUnder25 = (value) => {
    handleDiscounts(prevDiscounts => ({
      ...prevDiscounts,
      under25: {
        ...prevDiscounts.under25,
        toggled: value
      }
    }));
  };
  const handleJustMarried = (toggled, date, approved) => {
    handleDiscounts(prevDiscounts => ({
      ...prevDiscounts,
      justMarried: {
        toggled: toggled,
        date: date,
        approved: approved
      }
    }));
  };
  const handlePersonal = (value) => {
    handleDiscounts(prevDiscounts => ({
      ...prevDiscounts,
      personal: {
        toggled: value
      }
    }));
  };
  const handleFamily = (toggled, children, dependents) => {
    handleDiscounts(prevDiscounts => ({
      ...prevDiscounts,
      family: {
        toggled: toggled,
        children: children > 0 ? children : 0,
        dependents: (dependents > 0 ? (dependents > children ? children : dependents) : 0)
      }
    }));
  };

  const onMarrigeChecked = () => {
    if (!justMarried.date) {
      return (
        <Button 
          basic
          content="Dátum hozzáadása"
          onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
        />
      );
    } else {
      return (
        <div>
          <Button 
            basic
            content="Dátum módosítása"
            onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
          />
          <Label 
            color={justMarried.approved ? "green" : "red"}
          >
            {justMarried.approved ? "Jogosult" : "Nem jogosult"}
          </Label>
        </div>
      );
    }
  }
  const approveMarrige = () => {
    if(justMarried.date){
      const currentDate = new Date();
      const marrigeDate = new Date(justMarried.date);
      const differenceInMounth = (currentDate.getFullYear() - marrigeDate.getFullYear()) * 12 + (currentDate.getMonth() - marrigeDate.getMonth());

      if(differenceInMounth <= 24 && differenceInMounth >= 1){
        handleJustMarried(justMarried.toggled, justMarried.date, true)
      } else {
        handleJustMarried(justMarried.toggled, justMarried.date, false);
      }
    } else {        
      handleJustMarried(justMarried.toggled, justMarried.date, false);
    }
  }
  const onFamilyChecked = () => {
    return(
      <div>
        <button onClick={() => handleFamily(family.toggled, (family.children + 1), family.dependents)}>+</button>
        <p>{family.children}</p>
        <button onClick={() => handleFamily(family.toggled, (family.children - 1), family.dependents)}>-</button>
        <p className="text-xs">Eltartottak, ebből kedvezményezett</p>
        <button onClick={() => handleFamily(family.toggled, family.children, (family.dependents + 1))}>+</button>
        <p>{family.dependents}</p>
        <button onClick={() => handleFamily(family.toggled, family.children, (family.dependents - 1))}>-</button>
        <p className="text-xs">Kedvezményezettek</p>
      </div>
    )
  }
  
  useEffect(() => {
    onMarrigeChecked();
  }, [justMarried.toggled, justMarried.date, justMarried.approved]);
  useEffect(() => {
    approveMarrige();
  }, [justMarried.date]);
  useEffect(() => {
    onFamilyChecked();
  }, [family.toggled, family.children, family.dependents]);
  

  return (
    <div className='flex flex-col w-80'>
      <div>
        <DiscountOption 
          label={"25 év alattiak SZJA mentessége"}
          checked={under25.toggled}
          onChange={ () => handleUnder25(!under25.toggled)}
        />
        <DiscountOption 
          label={"Friss házasok kedvezménye"}
          checked={justMarried.toggled}
          onChange={ () => handleJustMarried(!justMarried.toggled, justMarried.date, justMarried.approved)}
          onChecked={onMarrigeChecked}
        />
        <DiscountOption 
          label={"Személyi adókedvezmény"}
          checked={personal.toggled}
          onChange={ () => handlePersonal(!personal.toggled)}

        />
        <DiscountOption 
          label={"Családi kedvezmény"}
          checked={family.toggled}
          onChange={ () => handleFamily(!family.toggled, family.children, family.dependents)}
          onChecked={onFamilyChecked}
        />
      </div>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <ModalContent>
          <p>A kedvezményt elősször a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.</p>
          <h3>Add meg a házasságkötést dátumát!</h3>
          <Input 
            type="date" 
            value={justMarried.date} 
            onChange={(e) => handleJustMarried(justMarried.toggled, e.target.value, justMarried.approved)}
          />
        </ModalContent>
        <ModalActions>
          <Button fluid onClick={() => {
            dispatch({ type: 'CLOSE_MODAL' })
          }}
          >
            Kész
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
}

export default Discounts;
