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
    <div className="w-2/4 flex rounded-lg border-gray-300 border-2 p-0">
      <input
        className="flex-1 outline-none text-lg p-1 rounded-tl-lg rounded-bl-lg w-2/12"
        type="text"
        ref={inputRef}
        placeholder={placeholder || "Search here"}
        onKeyDown={handleKeyDown}
      />
      <button
        className="rounded-tr-lg rounded-br-lg w-2/12 bg-gray-200"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}
