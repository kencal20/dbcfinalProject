import React from "react";
import '../style.css'
export default function Input(type, name, value, placeholder, onChange) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
