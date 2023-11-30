import React, { useState } from "react";
import "./ToggleSwitch.css";
export default function ToggleSwitch(){
  
  const [currentUnit, handleSwitch] = useState('C');
  
  const handleChange = () => {
    if (currentUnit === 'C') handleSwitch("F");
    if (currentUnit === 'F') handleSwitch("C");
    console.log(currentUnit);
  };

  return (
    <label className="switch">
      <input onChange={handleChange} type="checkbox" className="switch__box"/>
      <span className={currentUnit === 'F' ? "switch__slider switch__slider-F" : "switch__slider switch__slider-C"}></span>
      <p className={`switch__unit-F ${currentUnit === 'F' && "switch__active"}`}>F</p>
      <p className={`switch__unit-C ${currentUnit === 'C' && "switch__active"}`}>C</p>
    </label>
  )
}