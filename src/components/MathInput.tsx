import React, {useState} from 'react';
import {Equation} from "../Types";

type State = {
    input: string;
}

type Props = {
    equation?: Equation;
    onChange?: (e: Equation) => any;
}

function MathInput(props: Props) {
    const [state, setState] = useState<State>({input: props.equation?.string || ''})

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        let fn: ((x: number) => number) | undefined = props.equation?.fn;
        let exp = '';
        try {
            exp = input.replace(/[^0-9()+\-*\/x ]/g, ""); // Remove extra characters
            exp = exp.replace(/x([\w1-9])$/, "x") // Remove non 'x'
            if (exp.length === 0) throw new SyntaxError();
            // @ts-ignore
            fn = new Function('x', 'return ' + exp)
            input = exp;
        } catch (e) {
            console.error(e)
            if (!(e instanceof SyntaxError)) throw e;
            else exp = 'Неверное уравнение'
            fn = props.equation?.fn;
        }
        

        if (props.onChange) props.onChange({
            string: exp,
            fn
        })
        setState({input: input})
    }

    return (
        <div>
            <input placeholder={"Математическое уравнение"} onChange={onChange} value={state.input}/>
            <p>Уравнение: {props.equation?.string}</p>
        </div>
    );
}

export default MathInput;