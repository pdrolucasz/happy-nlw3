import React from 'react';

import './styles/global.css'
import 'leaflet/dist/leaflet.css'

import Routes from './routes'

import AppProvider from './hooks'

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
