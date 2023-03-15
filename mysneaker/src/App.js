import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';
import Tutorial from './components/tutorial';
import LehrerPage from './components/LehrerPage/LehrerPage';
import KlassenDetailPage from './components/LehrerPage/KlassenDetailPage'
import RegisterPage from './components/RegisterPage';
import Logout from './components/Utils/Logout';
import {useEffect} from 'react';


function App() {

    useEffect(() => {
        if (localStorage.getItem('color-theme')) {
            document.documentElement.classList.add(localStorage.getItem('color-theme'));
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
