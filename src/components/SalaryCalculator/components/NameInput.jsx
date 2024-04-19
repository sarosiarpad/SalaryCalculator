import React from "react";
import { Input } from 'semantic-ui-react'

const NameInput = (props) => {
    const name = props.name;
    const handleName = props.handleName;

    const handleInputChange = (event) => {
        handleName(event.target.value);
    };

    return ( 
    <div className='flex flex-col w-full'>
        <h3 className=" font-bold text-lg">Családtag neve</h3>
        <Input 
            value={name}
            onChange={handleInputChange} 
        />
        <p className=" text-sm font-light">Add meg a családtag nevét!</p>
    </div>
    );
}
 
export default NameInput;