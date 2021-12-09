import React from 'react';
import './App.scss';
import Graph from "./components/Graph";

type State = {
    value: number;
};

function App() {
    const [state, setState] = React.useState<State>({value: 0});

    return (
        <div className="App">
            <div className="content">
                <button onClick={() => setState({value: ++state.value})}>Click</button>
                <Graph data={[{x: state.value, y: 0}, {x: 10, y: 10}]}/>
            </div>
        </div>
    );
}

export default App;
