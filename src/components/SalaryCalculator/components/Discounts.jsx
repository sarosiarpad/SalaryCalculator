import React, { useState } from "react";
import { Checkbox, Input, Label } from 'semantic-ui-react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react'

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

const Discounts = ({ discounts, onDiscountChange, dependents, onDependentsChange, approvedMarrige, onApprovedMarrigeChange }) => {
  const [children, setChildren] = useState(0);
  const [marriageDate, setMarriageDate] = useState();
  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  const handleChildren = (num) => {
      setChildren(num);
  }

  const handleDiscountChange = (discountType) => {
      onDiscountChange(discountType);
  }

  const handleModalOpen = () => {
    dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring'});
  }

  const addMarrigeButtonLabel = () => {
    if (!marriageDate) {
      return (
        <Button 
          basic
          content="Dátum hozzáadása"
          onClick={handleModalOpen}
        />
      );
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(marriageDate);
      const differenceInMonths = (currentDate.getFullYear() - selectedDate.getFullYear()) * 12 + (currentDate.getMonth() - selectedDate.getMonth());
      if (differenceInMonths <= 24 && differenceInMonths >= 1) {
        onApprovedMarrigeChange(true);
        return (
          <div>
            <Button 
              basic
              content="Dátum módosítása"
              onClick={handleModalOpen}
            />
            <Label color="green">Jogosult</Label>
          </div>
        );
      } else {
        onApprovedMarrigeChange(false);
        return (
          <div>
            <Button 
              basic
              content="Dátum módosítása"
              onClick={handleModalOpen}
            />
            <Label color="red">Nem jogosult</Label>

          </div>
        );
      }
    }
  };

  return (
    <div className='flex flex-col w-80'>
      <div>
        <h3 className="font-bold">Kedvezmények</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox
          toggle
          label="25 alatti SZJA mentesség"
          checked={discounts.under25}
          onChange={() => handleDiscountChange('under25')}
        />
        <div>
          <Checkbox
            toggle
            label="Friss házasok kedvezménye"
            checked={discounts.justMarried}
            onChange={() => handleDiscountChange('justMarried')}
          />
          {discounts.justMarried && addMarrigeButtonLabel() }
        </div>
        <Checkbox
          toggle
          label="Személyi adókedvezmény"
          checked={discounts.personal}
          onChange={() => handleDiscountChange('personal')}
        />
        <div>
          <Checkbox
            toggle
            label="Családi adókedvezmény"
            checked={discounts.family}
            onChange={() => handleDiscountChange('family')}
          />
          {discounts.family && (
            <div className="flex flex-row items-center gap-2">
              <button onClick={() => handleChildren(children + 1)}>+</button>
              <p>{children}</p>
              <button onClick={() => handleChildren(children > 0 ? (children -1 ) : 0)}>-</button>
              <p className="text-xs">Eltartottak, ebből kedvezményezett</p>
              <button onClick={() => onDependentsChange(dependents < children ? (dependents + 1) : dependents)}>+</button>
              <p>{dependents}</p>
              <button onClick={() => onDependentsChange(dependents > 0 ? (dependents -1) : 0)}>-</button>
            </div>
          )}
        </div>
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
            value={marriageDate} 
            onChange={(e) => setMarriageDate(e.target.value)} 
          />
        </ModalContent>
        <ModalActions>
          <Button fluid onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Kész
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
}

export default Discounts;
