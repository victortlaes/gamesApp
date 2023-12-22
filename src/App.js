import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamesApp from './gamesApp';
import Teste from './test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/games" element={<GamesApp />}/>
        <Route path="/teste" element={<Teste />}/>
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
