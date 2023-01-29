import React, { useState } from 'react';


function FilterDropdown({setFilterValue}: {setFilterValue:React.Dispatch<React.SetStateAction<string>>}) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e:  React.SyntheticEvent<EventTarget>) => {
    const value = (e.target as HTMLSelectElement).value;
    setSelectedOption(value);
    setFilterValue(value)
  };

  return (
    <div className="flex items-center">
      <select
        className="mr-4 select"
        value={selectedOption}
        onChange={handleOptionChange}
        defaultValue=""
        >
        <option value="" disabled>Filter by</option>
        <option value="lowest">Lowest rate</option>
        <option value="highest">Highest rate</option>
      </select>
    </div>
  );
}

export default FilterDropdown;