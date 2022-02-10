import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/DashBoard' element={<DashBoardPage />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Router>
  );
}

export default App;
