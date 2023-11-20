import React from "react";
import "./input_styles.css";
export default function LargeInput({
  id,
  type,
  onChange,
  name,
  placeholder,
  className,
  inputLabel,
  value,
}) {
  return (
    <div className="input">
      <label>{inputLabel}</label>
      <br />
      <input
        id={id}
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        required
      />
  
    </div>
  );
}
