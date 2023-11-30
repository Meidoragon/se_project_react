import React, { useContext } from "react";
import { CurrentTempUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
export default function ToggleSwitch(){
  
  const { tempUnitIsC, handleTempUnitSwitch } = useContext(CurrentTempUnitContext)

  return (
    <label className="switch">
      <input onChange={handleTempUnitSwitch} type="checkbox" className="switch__box"/>
      <span className={tempUnitIsC ? "switch__slider switch__slider-C" : "switch__slider switch__slider-F"}></span>
      <p className={`switch__unit-F ${!tempUnitIsC && "switch__active"}`}>F</p>
      <p className={`switch__unit-C ${tempUnitIsC && "switch__active"}`}>C</p>
    </label>
  )
}