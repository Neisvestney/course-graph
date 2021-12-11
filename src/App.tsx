import React from 'react';
import './App.scss';
import Graph from "./components/Graph";
import MathInput from "./components/MathInput";
import {Equation} from "./Types";

type State = {
    equation: Equation
};

function App() {
    const [state, setState] = React.useState<State>({equation: {string: "x", fn: x => x}});

    const onChange = (e: Equation) => {
        console.log(e.fn)
        setState({equation: e});
    }

    return (
        <div className="App">
            <div className="content">
                <MathInput equation={state.equation} onChange={onChange}/>
                <Graph equation={state.equation}/>
            </div>
        </div>
    );
}

export default App;
