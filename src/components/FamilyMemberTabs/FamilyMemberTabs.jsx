import { useState } from 'react';
import Tab from "./components/Tab"

const FamilyMemberTabs = ({ setActiveMember }) => {
  const [tabs, setTabs] = useState([{ id: 1, name: `Member 1` }]);

  const addTab = () => {
    const newTabId = tabs.length + 1;
    const newTabs = [...tabs, { id: newTabId, name: `Member ${newTabId}` }];
    setTabs(newTabs);
  };

  const handleNameChange = (id, newName) => {
    const updatedTabs = tabs.map(tab => {
      if (tab.id === id) {
        return { ...tab, name: newName };
      }
      return tab;
    });
    setTabs(updatedTabs);
    setActiveMember(newName); // Értesítjük a szülőt az új névről
  };

  const handleTabClick = (id, name) => {
    setActiveMember(name);
  };

  return (
    <div className='w-fit ml-5 mr-5 mt-2 flex flex-row gap-5 bg-gray-200 rounded-lg'>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.id}
          id={tab.id}
          name={tab.name}
          onChange={handleNameChange}
          onClick={handleTabClick}
        />
      ))}
      <button className="bg-gray-200 hover:bg-gray-500 text-black text-2xl p-2 rounded-lg" onClick={addTab}>
        +
      </button>
    </div>
  );
};

export default FamilyMemberTabs;