import React, { useState } from 'react';

export default function Dropdown({ title, items }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleItemClick = (item) => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        {title}
        <svg className={`w-2.5 h-2.5 ms-3 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      <div
        className={`${isDropdownOpen ? 'block' : 'hidden'} z-10 absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {items.map((item, index) => (
            <li key={index}>
              <button
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}