import './App.css';
import AllAds from './components/AllAds';
import AdCreate from './components/AdCreate';
import AdDetails from './components/AdDetails';
import AdUpdate from './components/AdUpdate';
import Home from './pages/Home'
import SearchPage from './pages/SearchPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AllAds/>} path="/dashboard" />
          <Route element={<AdCreate/>} path="/new" />
          <Route element={<AdDetails/>} path="/:id" />
          <Route element={<AdUpdate/>} path="/:id/update" />
          <Route element={<Home/>} path ="/" />
          <Route element={<SearchPage/>} path="/search" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
