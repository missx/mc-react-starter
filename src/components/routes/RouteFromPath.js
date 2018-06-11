import React from 'react';
import { Route } from 'react-router-dom';

const RouteFromPath = route => (
  <Route
    {...route}
  />
);

export default RouteFromPath;
