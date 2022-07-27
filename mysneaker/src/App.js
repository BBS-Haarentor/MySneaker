import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';
import Tutorial from './components/tutorial';
import LehrerPage from './components/LehrerPage';
import KlassenDetailPage from './components/KlassenDetailPage'
import RegisterPage from './components/RegisterPage';
import Logout from './components/Logout';
import { useEffect } from 'react';


function App() {

    useEffect(() => {
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
              document.documentElement.classList.add('light');
              window.localStorage.setItem('color-theme', 'light');
            } else {
              document.documentElement.classList.add('dark');
              window.localStorage.setItem('color-theme', 'dark');
            }
          } else {
            if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
            } else {
              document.documentElement.classList.add('light');
              localStorage.setItem('color-theme', 'light');
            }
          }
    })

    return (
        <div className="dark:bg-[#1a202c] bg-[#f7fafc]">
            <Router>
                <Routes>
                    <Route path='/dashboard' element={<DashBoardPage/>}/>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/tutorial' element={<Tutorial/>}/>
                    <Route path='/ler' element={<LehrerPage/>}/>
                    <Route path='/ler/:id' element={<KlassenDetailPage/>}/>
                    <Route path='/register/:id' element={<RegisterPage/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
