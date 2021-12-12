import React, {useState} from 'react';
import {Equation, EquationFunction} from "../Types";
import {compile} from "mathjs";

import './MathInput.scss'

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
        let fn: EquationFunction | undefined = props.equation?.fn;
        let exp = input;
        try {
            const expr = compile(exp.replace(',', '.'));
            expr.evaluate({x: 1.1});
            fn = expr.evaluate;
        } catch (e) {
            // @ts-ignore
            console.log(e.message, e.message.startsWith('Error: Undefined symbol'))
            // @ts-ignore
            if (!e.message.startsWith('Undefined symbol') && !(e instanceof SyntaxError) && !(e instanceof TypeError)) exp = e.message;
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
        <div className={'wrapper'}>
            <div className={'input'}><i>y</i> = <i>f(x)</i> = <input placeholder={"Математическое уравнение"} onChange={onChange} value={state.input}/></div>
            <p className={'equation'}>{props.equation?.string ? props.equation?.string : 'Пустое уравнение'}</p>
        </div>
    );
}

export default MathInput;