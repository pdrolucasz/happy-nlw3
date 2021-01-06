import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import './styles/global.css'
import 'leaflet/dist/leaflet.css'

import Routes from './routes'

import AppProvider from './hooks'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
