import React from 'react';
import MeteoWidget from './MéteoWidget';

import './app.scss';

const App = () => (
  <div className="app">
    <h1 className="app_title">App Météo</h1>
    <MeteoWidget />
  </div>
);

export default App;
