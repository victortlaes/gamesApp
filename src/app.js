import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamesApp from './pages/gamesApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/games" element={<GamesApp />}/>
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
