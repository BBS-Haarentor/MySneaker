import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';
import Tutorial from './components/tutorial';
import LehrerPage from './components/LehrerPage';
import KlassenDetailPage from './components/KlassenDetailPage'
import RegisterPage from './components/RegisterPage';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/dashboard' element={<DashBoardPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/ler' element={<LehrerPage />} />
          <Route path='/ler/:name' element={<KlassenDetailPage />} />
          <Route path='/register/:id' element={<RegisterPage />} />
        </Routes>
      </Router>
  );
}

export default App;
