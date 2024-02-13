import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext)

  return (
    <label className="switch">
      <input onChange={handleToggleSwitchChange} type="checkbox" className="switch__box" />
      <span className={currentTemperatureUnit === 'celsius' ? "switch__slider switch__slider-C" : "switch__slider switch__slider-F"}></span>
      <p className={`switch__unit-F ${currentTemperatureUnit === 'farenheit' && "switch__active"}`}>F</p>
      <p className={`switch__unit-C ${currentTemperatureUnit === 'celsius' && "switch__active"}`}>C</p>
    </label>
  )
}
