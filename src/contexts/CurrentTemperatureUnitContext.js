import React from "react";
export const CurrentTempUnitContext = React.createContext({
  tempUnitIsC: false,
  handleTempUnitSwitch: () => {},  
});