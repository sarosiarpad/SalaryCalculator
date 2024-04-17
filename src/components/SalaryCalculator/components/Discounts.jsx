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

const Discounts = ({ discounts, handleDiscounts }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  const {under25, justMarried, personal, family} = discounts;

  const handleDiscountToggled = (discountName) => {
    handleDiscounts({
      discounts: {
        [discountName]: {
          toggled: !discounts[discountName].toggled,
          ...discounts[discountName]
        }
      }
    });
  };

  const onMarrigeChecked = () => {
    if (!justMarried.date) {
      return (
        <Button 
          basic
          content="Dátum hozzáadása"
          onClick={dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
        />
      );
    } else {
      return (
        <div>
          <Button 
            basic
            content="Dátum módosítása"
            onClick={dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
          />
          <Label 
            color={justMarried.approved ? "green" : "red"}
          >
            {justMarried.approved ? "Josogult" : "Nem jogosult"}
          </Label>
        </div>
      );
    }
  }

  return (
    <div className='flex flex-col w-80'>
      <div>
        <DiscountOption 
          label={"25 év alattiak SZJA mentessége"}
          checked={under25.toggled}
          onChange={ () => handleDiscountToggled("under25")}
        />
        <DiscountOption 
          label={"Friss házasok kedvezménye"}
          checked={justMarried.toggled}
          onChange={ () => handleDiscountToggled("justMarried")}
        />
        <DiscountOption 
          label={"Személyi adókedvezmény"}
          checked={personal.toggled}
          onChange={ () => handleDiscountToggled("personal")}

        />
        <DiscountOption 
          label={"Családi kedvezmény"}
          checked={family.toggled}
          onChange={ () => handleDiscountToggled("family")}
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
            onChange={(e) => { }}
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
