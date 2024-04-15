import { useState } from "react";

const Tab = ({id, name, onChange, onClick}) => {
    const [tabName, setTabName] = useState(name);

    const handleChange = (e) => {
        const newName = e.target.value;
        setTabName(newName);
        onChange(id, newName); // Értesítjük a szülőt az új névről
    };

    return (
        <button className="p-3" onClick={() => onClick(id, tabName)}>
            <input 
                type="text" 
                placeholder={name} 
                value={tabName} // Használjuk az állapotot az input értékének megjelenítéséhez
                onChange={handleChange}
                className="bg-transparent w-20 text-center"
            />
        </button>
    );
};

export default Tab;