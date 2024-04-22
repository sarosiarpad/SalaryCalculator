import React, { useDebugValue, useEffect } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalActions, 
  Input, Button, 
  Label, Icon
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
    handleDiscounts({
      under25: {
          toggled: value
      }
    });
  };
  const handleJustMarried = (toggled, date, approved) => {
    handleDiscounts({
      justMarried: {
        toggled: toggled,
        date: date,
        approved: approved
      }
    });
  };
  const handlePersonal = (value) => {
    handleDiscounts({
      personal: {
        toggled: value
      }
    });
  };
  const handleFamily = (toggled, children, dependents) => {
    handleDiscounts({
      family: {
        toggled: toggled,
        children: children > 0 ? (children > 3 ? 3 : children) : 0,
        dependents: dependents > 0 ? (dependents > children ? children : dependents) : 0
      }
    });
  };

  const onMarrigeChecked = () => {
    if (!justMarried.date) {
      return (
        <div className="flex flex-row gap-2 shrink">
          <Button 
            primary
            size="mini"
            content="Dátum hozzáadása"
            onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2 shrink relative">
          <Button 
            size="mini"
            primary
            onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
            content="Dátum módosítása"
          />
          <Label 
            className=" text-center w-fit"
            size="mini"
            floating="right"
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
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-2">
          <button onClick={() => handleFamily(family.toggled, (family.children - 1), family.dependents)}>
            <Icon name="minus circle" color="blue"/>
          </button>
          <p>{family.children}</p>
          <button onClick={() => handleFamily(family.toggled, (family.children + 1), family.dependents)}>
            <Icon name="plus circle" color="blue"/>
          </button>
        </div>

        <p className=" text-base">Eltartottak, ebből kedvezményezett</p>

        <div className="flex flex-row gap-2">
          <button onClick={() => handleFamily(family.toggled, family.children, (family.dependents - 1))}>
            <Icon name="minus circle" color="blue"/>
          </button>
          <p>{family.dependents}</p>
          <button onClick={() => handleFamily(family.toggled, family.children, (family.dependents + 1))}>
            <Icon name="plus circle" color="blue"/>
          </button>
        </div>
      </div>
    );
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
    <div className='flex flex-col w-full'>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2">
          <DiscountOption 
            label={"25 év alattiak SZJA mentessége"}
            checked={under25.toggled}
            onChange={ () => handleUnder25(!under25.toggled)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <DiscountOption 
            label={"Friss házasok kedvezménye"}
            checked={justMarried.toggled}
            onChange={ () => handleJustMarried(!justMarried.toggled, justMarried.date, justMarried.approved)}
          />
          {justMarried.toggled && onMarrigeChecked()}
        </div>
        <div className="flex flex-row gap-2">
          <DiscountOption 
            label={"Személyi adókedvezmény"}
            checked={personal.toggled}
            onChange={ () => handlePersonal(!personal.toggled)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <DiscountOption
            label={"Családi kedvezmény"}
            checked={family.toggled}
            onChange={ () => handleFamily(!family.toggled, family.children, family.dependents)}
          />
          {family.toggled && onFamilyChecked()}
        </div>
      </div>
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        size="tiny"
      >
        <ModalContent>
          <div className="flex flex-col gap-5">
            <p>A kedvezményt elősször a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.</p>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Add meg a házasságkötést dátumát:</h3>
              <Input 
                type="date" 
                value={justMarried.date} 
                onChange={(e) => handleJustMarried(justMarried.toggled, e.target.value, justMarried.approved)}
              />
            </div>
          </div>
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
