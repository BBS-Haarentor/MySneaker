import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';
import Tutorial from './components/tutorial';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/DashBoard' element={<DashBoardPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/tutorial' element={<Tutorial />} />
        </Routes>
      </Router>
  );
}

export default App;
