import './App.css';
import AllAds from './components/AllAds';
import AdCreate from './components/AdCreate';
import AdDetails from './components/AdDetails';
import AdUpdate from './components/AdUpdate';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AllAds/>} path="/" />
          <Route element={<AdCreate/>} path="/new" />
          <Route element={<AdDetails/>} path="/:id" />
          <Route element={<AdUpdate/>} path="/:id/update" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
