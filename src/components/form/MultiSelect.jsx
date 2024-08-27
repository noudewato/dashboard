// /* eslint-disable react/prop-types */
// import { motion } from "framer-motion";
// import { useEffect, useRef, useState, useCallback } from "react";
// import { BsChevronExpand, BsSearch, BsX } from "react-icons/bs";
// import { FiCheck } from "react-icons/fi";

// const MultiSelect = ({ options, onSelect, checkbox = false }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const selectRef = useRef(null);

//   // Calculate dropdown position based on available space
//   const calculateDropdownPosition = () => {
//     if (!selectRef.current) return;

//     const buttonRect = selectRef.current.getBoundingClientRect();
//     const dropdownHeight = 320; // Max height for the dropdown

//     const spaceBelow = window.innerHeight - buttonRect.bottom;
//     const spaceAbove = buttonRect.top;

//     if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
//       return "below"; // Enough space below or more than above, position below
//     } else {
//       return "above"; // Not enough space below, position above
//     }
//   };

//   const [dropdownPosition, setDropdownPosition] = useState("below");

//   // Update dropdown position when isOpen changes
//   useEffect(() => {
//     setDropdownPosition(calculateDropdownPosition());
//   }, [isOpen]);

//   // Toggle the dropdown's visibility
//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   // Select or deselect an option
//   const handleSelectOption = (option) => {
//     const isOptionSelected = selectedOptions.some(
//       (selectedOption) => selectedOption.value === option.value
//     );

//     if (isOptionSelected) {
//       const updatedOptions = selectedOptions.filter(
//         (selectedOption) => selectedOption.value !== option.value
//       );
//       setSelectedOptions(updatedOptions);
//     } else {
//       const updatedOptions = [...selectedOptions, option];
//       setSelectedOptions(updatedOptions);
//     }
//   };

//   // Remove a selected option
//   const handleRemoveOption = (option) => {
//     const updatedOptions = selectedOptions.filter(
//       (selectedOption) => selectedOption.value !== option.value
//     );
//     setSelectedOptions(updatedOptions);
//   };

//   // Handle input change for search functionality
//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   // Filter options based on search value
//   const filteredOptions = options.filter((option) =>
//     option.label.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   // Memoize the onSelect callback to avoid unnecessary re-renders
//   const memoizedOnSelect = useCallback((selectedValues) => {
//     onSelect(selectedValues);
//   }, []);

//   // Call the onSelect callback when selectedOptions change
//   useEffect(() => {
//     const selectedValues = selectedOptions.map((option) => option.value);
//     memoizedOnSelect(selectedValues);
//   }, [selectedOptions, memoizedOnSelect]);

//   // Handle clicks outside the component to close the dropdown
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (selectRef.current && !selectRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     // Handle Escape key press to close the dropdown
//     const handleEscapeKey = (event) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     // Add event listeners
//     document.addEventListener("mousedown", handleOutsideClick);
//     document.addEventListener("keydown", handleEscapeKey);

//     // Clean up event listeners
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//       document.removeEventListener("keydown", handleEscapeKey);
//     };
//   }, []);

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -30 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div ref={selectRef} className="relative">
//       <button
//         type="button"
//         className="relative z-10 flex items-center justify-between w-full py-2 pl-3 pr-4  text-left bg-white dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-600 shadow-sm rounded-md cursor-pointer focus:outline-none focus:!border-transparent focus:ring-2 focus:ring-primry"
//         onClick={handleToggle}
//       >
//         {selectedOptions.length ? (
//           <div className="flex flex-wrap gap-2">
//             {selectedOptions?.map((option) => (
//               <div
//                 key={option.value}
//                 className="flex items-center justify-center px-2 py-1 text-sm rounded-full text-slate-500 dark:text-slate-200 bg-slate-200 dark:bg-zinc-700"
//               >
//                 {option.label}
//                 <BsX
//                   className="ml-1 rounded-full cursor-pointer hover:bg-slate-300 dark:hover:bg-zinc-500"
//                   onClick={() => handleRemoveOption(option)}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           "Select an option"
//         )}
//         <BsChevronExpand className="text-slate-400 dark:text-slate-200" />
//       </button>
//       {isOpen && (
//         <motion.div
//           className={`absolute z-20 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm ${
//             dropdownPosition === "above" ? "bottom-full" : "top-full"
//           }`}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           variants={dropdownVariants}
//         >
//           <div className="relative">
//             <BsSearch className="absolute mr-2 -translate-y-1/2 text-zinc-400 top-1/2 left-2" />
//             <input
//               type="text"
//               className="w-full ml-5 p-2 pl-10 bg-transparent border-b text-slate-400 dark:text-slate-200 border-zinc-300 dark:border-zinc-600 focus:outline-none"
//               placeholder="Search options..."
//               value={searchValue}
//               onChange={handleInputChange}
//             />
//           </div>
//           <ul className="py-2">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option) =>
//                 checkbox ? (
//                   <li
//                     key={option.value}
//                     className={`px-3 py-2 cursor-pointer hover:bg-slate-200 group dark:hover:bg-zinc-700`}
//                     onClick={() => handleSelectOption(option)}
//                   >
//                     <div className="flex items-center gap-x-2">
//                       <input
//                         type="checkbox"
//                         className="appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 shadow-sm rounded grid place-items-center checked:before:content-['\002714'] checked:text-white checked:text-[0.6rem] checked:bg-primry checked:border-2 checked:border-white dark:checked:border-[#1e1e1e] relative checked:after:absolute checked:after:w-5 checked:after:h-5 checked:after:border-2 checked:after:border-primry checked:after:rounded"
//                         checked={selectedOptions.some(
//                           (selectedOption) =>
//                             selectedOption.value === option.value
//                         )}
//                         readOnly
//                       />
//                       {option.icon && (
//                         <span className="mr-2">{option.icon}</span>
//                       )}
//                       <span className="text-slate-500 dark:text-slate-200">
//                         {option.label}
//                       </span>
//                     </div>
//                   </li>
//                 ) : (
//                   <li
//                     key={option.value}
//                     className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700 ${
//                       selectedOptions.some(
//                         (selectedOption) =>
//                           selectedOption.value === option.value
//                       )
//                         ? "bg-slate-200 dark:bg-zinc-700"
//                         : ""
//                     }`}
//                     onClick={() => handleSelectOption(option)}
//                   >
//                     <div className="flex items-center gap-x-2">
//                       {option.icon && (
//                         <span className="mr-2">{option.icon}</span>
//                       )}
//                       <span className="text-slate-500 dark:text-slate-200">
//                         {option.label}
//                       </span>
//                     </div>
//                     {selectedOptions.some(
//                       (selectedOption) => selectedOption.value === option.value
//                     ) && (
//                       <FiCheck className="ml-2 text-slate-500 dark:text-slate-200" />
//                     )}
//                   </li>
//                 )
//               )
//             ) : (
//               <li className="px-3 py-2 text-slate-400 dark:text-slate-200 opacity-80">
//                 No options found.
//               </li>
//             )}
//           </ul>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default MultiSelect;

/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { BsChevronExpand, BsSearch, BsX } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";

const MultiSelect = ({ options, onSelect, checkbox = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
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

  // Select or deselect an option
  const handleSelectOption = (option) => {
    const isOptionSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );

    if (isOptionSelected) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      );
      setSelectedOptions(updatedOptions);
    } else {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    }
  };

  // Remove a selected option
  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== option.value
    );
    setSelectedOptions(updatedOptions);
  };

  // Handle input change for search functionality
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Filter options based on search value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Memoize the onSelect callback to avoid unnecessary re-renders
  const memoizedOnSelect = useCallback((selectedValues) => {
    onSelect(selectedValues);
  }, []);

  // Call the onSelect callback when selectedOptions change
  useEffect(() => {
    const selectedValues = selectedOptions.map((option) => option.value);
    memoizedOnSelect(selectedValues);
  }, [selectedOptions, memoizedOnSelect]);

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
    <div ref={selectRef} className="relative">
      <button
        type="button"
        className="relative z-10 flex items-center justify-between w-full py-2 pl-3 pr-4 text-left bg-white dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-600 shadow-sm rounded-md cursor-pointer focus:outline-none focus:!border-transparent focus:ring-2 focus:ring-primry"
        onClick={handleToggle}
      >
        {selectedOptions.length ? (
          <div className="flex flex-wrap gap-2">
            {selectedOptions?.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-center px-2 py-1 text-sm rounded-full text-slate-500 dark:text-slate-200 bg-slate-200 dark:bg-zinc-700"
              >
                {option.label}
                <BsX
                  className="ml-1 rounded-full cursor-pointer hover:bg-slate-300 dark:hover:bg-zinc-500"
                  onClick={() => handleRemoveOption(option)}
                />
              </div>
            ))}
          </div>
        ) : (
          "Select an option"
        )}
        <BsChevronExpand className="text-slate-400 dark:text-slate-200" />
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
            <BsSearch className="absolute mr-2 -translate-y-1/2 text-zinc-400 top-1/2 left-2" />
            <input
              type="text"
              className="w-full ml-5 p-2 pl-10 bg-transparent border-b text-slate-400 dark:text-slate-200 border-zinc-300 dark:border-zinc-600 focus:outline-none"
              placeholder="Search options..."
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          <ul className="py-2 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) =>
                checkbox ? (
                  <li
                    key={option.value}
                    className={`px-3 py-2 cursor-pointer hover:bg-slate-200 group dark:hover:bg-zinc-700`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className="flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        className="appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 shadow-sm rounded grid place-items-center checked:before:content-['\002714'] checked:text-white checked:text-[0.6rem] checked:bg-primry checked:border-2 checked:border-white dark:checked:border-[#1e1e1e] relative checked:after:absolute checked:after:w-5 checked:after:h-5 checked:after:border-2 checked:after:border-primry checked:after:rounded"
                        checked={selectedOptions.some(
                          (selectedOption) =>
                            selectedOption.value === option.value
                        )}
                        readOnly
                      />
                      {option.icon && (
                        <span className="mr-2">{option.icon}</span>
                      )}
                      <span className="text-slate-500 dark:text-slate-200">
                        {option.label}
                      </span>
                    </div>
                  </li>
                ) : (
                  <li
                    key={option.value}
                    className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700 ${
                      selectedOptions.some(
                        (selectedOption) =>
                          selectedOption.value === option.value
                      )
                        ? "bg-slate-200 dark:bg-zinc-700"
                        : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className="flex items-center gap-x-2">
                      {option.icon && (
                        <span className="mr-2">{option.icon}</span>
                      )}
                      <span className="text-slate-500 dark:text-slate-200">
                        {option.label}
                      </span>
                    </div>
                    {selectedOptions.some(
                      (selectedOption) => selectedOption.value === option.value
                    ) && (
                      <FiCheck className="ml-2 text-slate-500 dark:text-slate-200" />
                    )}
                  </li>
                )
              )
            ) : (
              <li className="px-3 py-2 text-slate-400 dark:text-slate-200 opacity-80">
                No options found.
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default MultiSelect;

