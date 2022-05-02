import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';
import Tutorial from './components/tutorial';
import LehrerPage from './components/LehrerPage';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/DashBoard' element={<DashBoardPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/ler' element={<LehrerPage />} />
        </Routes>
      </Router>
  );
}

export default App;
