import React from "react";

export default function Read({ params }) {
  const { id } = params;
  return <div>Read {id}</div>;
}
