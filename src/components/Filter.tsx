import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface CustomDropdownProps {
  options: string[]; // Array of options to display in the dropdown
  selected: string;  // Current selected value
  onSelect: (value: string) => void; // Function to handle when an option is selected
}



const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selected, setSelected] = useState('Filter by Region');

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-[13rem] lg:w-[10rem]" >
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between  w-full shadow p-3 rounded-md bg-white dark:bg-dark-mode-element text-dark-grey"
      >
        {selected}
        {isOpen ? <FaChevronUp /> : <FaChevronDown/>}
        
      </button>
      {isOpen && (
        <ul className="absolute mt-1 w-full  rounded-md bg-white dark:bg-dark-mode-element text-dark-grey">
          {options.map((option) => (
            <li
            key={option}
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
