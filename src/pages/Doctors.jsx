import React from "react";
import { SearchBar } from "../components/common";

export default function Doctors() {
  const handleSearch = (text) => {
    console.log({ text });
  };

  return (
    <main>
      <div className="flex justify-center my-4">
        <SearchBar placeholder="Search doctor name" onClick={handleSearch} />
      </div>
      <div>Doctors</div>
    </main>
  );
}
