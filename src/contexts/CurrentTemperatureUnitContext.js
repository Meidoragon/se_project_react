import React from "react";
export const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: 'celsius',
  handleToggleSwitchChange: () => { },
  // isTempUnitC: false,
  // handleTempUnitSwitch: () => { },
});
