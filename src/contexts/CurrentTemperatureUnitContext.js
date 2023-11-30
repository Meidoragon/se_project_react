import React from "react";
export const CurrentTempUnitContext = React.createContext({
  isTempUnitC: false,
  handleTempUnitSwitch: () => {},  
});