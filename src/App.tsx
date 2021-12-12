import React, {useEffect, useState} from 'react';
import './App.scss';
import MainPage from "./pages/MainPage";
import {BrowserRouter as Router, Link, Route, Routes, useLocation} from 'react-router-dom'
import NotFound from "./pages/NotFound";
import logo from './logo64.png';
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";

const routes = [
    {path: '/', name: 'Home', Component: MainPage},
    {path: '*', name: 'NotFound', Component: NotFound},
]

function App() {
    const location = useLocation();
    const [firstPage, setFirstPage] = useState(true);
    console.log(firstPage ? 'first' : location.key)

    useEffect(() => {
        if (firstPage) setFirstPage(false);
    });

    return (
        <div className="App">
                <SwitchTransition>
                    <CSSTransition key={firstPage ? 'first' : location.key} classNames="page-transition" timeout={300}>
                        {!firstPage ? <Routes location={location}>
                            {routes.map(({path, Component}) => (
                                <Route key={path} path={path} element={<div className="content"><Component/></div>}/>
                            ))}
                        </Routes> : <div/>}
                    </CSSTransition>
                </SwitchTransition>
            <footer>
                <Link to={'/'} className={'main'}><img src={logo} alt={''}/>CourseGraph</Link>
            </footer>
        </div>
    );
}

export default App;
