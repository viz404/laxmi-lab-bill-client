import React, { useRef } from "react";

export default function SearchBar({ placeholder, onClick }) {
  const inputRef = useRef();

  const handleClick = () => {
    const text = inputRef.current.value;
    onClick(text);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      handleClick();
    }
  };

  return (
    <div className="w-2/4 flex rounded-xl overflow-hidden border-gray-300 dark:border-gray-500 border-2 p-0">
      <input
        className="flex-1 outline-none text-lg p-1 w-2/12 text-text-light dark:bg-gray-700 dark:text-white"
        type="text"
        ref={inputRef}
        placeholder={placeholder || "Search here"}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-primary text-text-dark text-lg px-4"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}
