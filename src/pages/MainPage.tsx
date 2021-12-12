import {Equation} from "../Types";
import React from "react";
import {compile} from "mathjs";
import MathInput from "../components/MathInput";
import Graph from "../components/Graph";

type State = {
    equation: Equation
};

function MainPage() {
    const [state, setState] = React.useState<State>({equation: {string: "x", fn: compile("x").evaluate}});

    const onChange = (e: Equation) => {
        console.log(e.fn)
        setState({equation: e});
    }

    return (
        <>
            <MathInput equation={state.equation} onChange={onChange}/>
            <Graph equation={state.equation}/>
        </>
    );
}

export default MainPage;
