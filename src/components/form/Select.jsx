/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BsChevronExpand, BsSearch } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const Select = ({
  options,
  icon,
  text = "Select an option",
  invalid = false,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef(null);

  // Calculate dropdown position based on available space
  const calculateDropdownPosition = () => {
    if (!selectRef.current) return;

    const buttonRect = selectRef.current.getBoundingClientRect();
    const dropdownHeight = 320; // Max height for the dropdown

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
      return "below"; // Enough space below or more than above, position below
    } else {
      return "above"; // Not enough space below, position above
    }
  };

  const [dropdownPosition, setDropdownPosition] = useState("below");

  // Update dropdown position when isOpen changes
  useEffect(() => {
    setDropdownPosition(calculateDropdownPosition());
  }, [isOpen]);

  // Toggle the dropdown's visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Select an option and close the dropdown
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  // Handle input change for search functionality
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Filter options based on search value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Handle Escape key press to close the dropdown
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    // Clean up event listeners
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={selectRef} className="relative !font-questrial">
      <button
        type="button"
        className={`relative z-10  flex items-center justify-between w-full py-2 pl-3 pr-4 text-left bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:!border-transparent ${
          icon ? "pl-8" : ""
        } ${invalid ? "!ring-2 !ring-red-600 !border-transparent" : ""}`}
        onClick={handleToggle}
      >
        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-2 ${
              invalid ? "text-red-600 !opacity-100" : ""
            }`}
          >
            {icon}
          </div>
        )}
        <span className="mr-2 ">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span
              className={`mr-2 text-zinc-400 dark:text-zinc-200 ${
                invalid ? "!text-red-600 !opacity-100" : ""
              }`}
            >
              {text}
            </span>
          )}
        </span>
        <BsChevronExpand />
      </button>
      {isOpen && (
        <motion.div
          className={`absolute z-20 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm ${
            dropdownPosition === "above" ? "bottom-full" : "top-full"
          }`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
        >
          <div className="relative">
            <BsSearch className="absolute mr-2 -translate-y-1/2 text-zinc-500 top-1/2 left-2" />
            <input
              type="text"
              className="w-full p-2 pl-10 bg-transparent border-b text-slate-500 dark:text-slate-200 border-zinc-300 dark:border-zinc-600 focus:outline-none"
              placeholder="Search options..."
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          <ul className="py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 ${
                    selectedOption?.value === option.value
                      ? "bg-[#0bab7c] hover:!bg-[#0bab7c]"
                      : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="flex items-center gap-x-2">
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    <span
                      className={`text-slate-500 dark:text-slate-200 ${
                        selectedOption?.value === option.value
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                  {selectedOption?.value === option.value && (
                    <FiCheck className="ml-2 text-white" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-slate-500 dark:text-slate-200 opacity-80">
                No options found.
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Select;
