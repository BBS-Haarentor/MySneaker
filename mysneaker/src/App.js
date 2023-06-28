import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoardPage from './components/DashBoardPage';
import MainPage from './components/MainPage';
import Tutorial from './components/tutorial';
import LehrerPage from './components/LehrerPage/LehrerPage';
import KlassenDetailPage from './components/LehrerPage/KlassenDetailPage'
import RegisterPage from './components/Authentication/RegisterPage';
import Logout from './components/Sidebar/Logout';
import {useEffect} from 'react';
import PageNotFound from "./components/PageNotFound";
import Game2048 from './components/Game2048/Game2048'
import AnalyticPDF from "./components/LehrerPage/KlasseContainer/PDF/AnalyticPDF";


const App = () => {
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
        <div className="h-screen dark:bg-[#1a202c] bg-[#f7fafc]">
            <Router>
                <Routes>
                    <Route exact path='/' element={<MainPage/>}/>
                    <Route path='/dashboard' element={<DashBoardPage/>}/>
                    <Route path='/tutorial' element={<Tutorial/>}/>
                    <Route path='/ler' element={<LehrerPage/>}/>
                    <Route path='/ler/:id' element={<KlassenDetailPage/>}/>
                    <Route path='/register/:id' element={<RegisterPage/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='*' element={<PageNotFound/>} />
                    <Route path='/ler/analytic/:gameId/:current_cycle_index' element={ <AnalyticPDF />}/>
                    <Route path="/game" element={<Game2048 />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
