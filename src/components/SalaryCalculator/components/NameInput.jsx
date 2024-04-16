import React from "react";
import { Input } from 'semantic-ui-react'

const NameInput = ({ name, onNameChange }) => {
    return ( 
    <div className='flex flex-col w-80'>
        <h3>Családtag neve</h3>
        <Input 
            value={name}
            onChange={onNameChange} 
        />
        <p>Add meg a családtag nevét!</p>
    </div>
    );
}
 
export default NameInput;