import { ChesstList } from './ChessList';
import { ChessSingle } from './ChessSingle';
import { ChessCreate } from './ChessCreate';
import { ChessDel } from './ChessDel';
import { ChessMod } from './ChessMod';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import './App.css';

export const App = () => {
  return (
    <Router>
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>Chess</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/create-chess'>Új Sakkozó</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path='/chess/:chessId' element={<ChessSingle />} />
        <Route path="/" element={<ChesstList />} />
        <Route path="/create-chess" element={<ChessCreate />} />
        <Route path='/del-chess/:chessId' element={<ChessDel/>}/>
        <Route path='/mod-chess/:chessId' element={<ChessMod/>}/>
      </Routes>
    </Router>
  );
}

export default App;
