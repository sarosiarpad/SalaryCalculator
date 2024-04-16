import React, { useState } from "react";
import { Checkbox } from 'semantic-ui-react';

const Discounts = ({ discounts, onDiscountChange, dependents, onDependentsChange }) => {
const [children, setChildren] = useState(0);

const handleChildren = (num) => {
    setChildren(num);
}

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
          onChange={() => onDiscountChange('under25')}
        />
        <Checkbox
          toggle
          label="Friss házasok kedvezménye"
          checked={discounts.justMarried}
          onChange={() => onDiscountChange('justMarried')}
        />
        <Checkbox
          toggle
          label="Személyi adókedvezmény"
          checked={discounts.personal}
          onChange={() => onDiscountChange('personal')}
        />
        <div>
        <Checkbox
          toggle
          label="Családi adókedvezmény"
          checked={discounts.family}
          onChange={() => onDiscountChange('family')}
        />
         {discounts.family && (
            <div className="flex flex-row">
                <input
                    className="w-2"
                    type="number"
                    value={children}
                    min={0}
                    onChange={(e) => handleChildren(parseInt(e.target.value))}
                />
                <p className="text-xs">Eltartottak, ebből kedvezményezett</p>
                <input
                    className="w-fit"
                    type="number"
                    value={dependents}
                    min={0}
                    max={children}
                    onChange={(e) => handleChildren(parseInt(e.target.value))}
                />
            </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Discounts;
