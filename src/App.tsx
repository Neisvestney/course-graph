import React from 'react';
import './App.scss';
import MainPage from "./pages/MainPage";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import NotFound from "./pages/NotFound";
import logo from './logo64.png';


function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route path={''} element={<MainPage/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
                <footer>
                    <Link to={'/'} className={'main'}><img src={logo} alt={''}/>CourseGraph</Link>
                </footer>
            </div>
        </Router>
    );
}

export default App;
