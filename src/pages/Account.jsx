import React from "react";
import { DoctorSelector } from "../components/common";
import { useParams } from "react-router-dom";

export default function Account() {
  const { id } = useParams();

  if (!id) {
    return <DoctorSelector navigateTo="/account/x" replace="x" />;
  }

  return (
    <main>
      <p>hi</p>
    </main>
  );
}
