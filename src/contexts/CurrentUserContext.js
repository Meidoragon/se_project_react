import React from "react";
export const CurrentUserContext = React.createContext({
  isLoggedIn: false,
  userToken: '',
  user: {},
  updateUser: () => { },
  updateIsLoggedIn: () => { },
});
