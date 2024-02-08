import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, loggedIn, }) {
  const { type: ChildComponent, props: ChildProps } = children;
  return (
    <Route>
      {
        () => loggedIn ? <ChildComponent {...ChildProps} /> : <Redirect to="./" />
      }
    </Route>
  )
}
