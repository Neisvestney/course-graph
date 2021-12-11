type EquationFunction = (x: {x: number}) => number

type Equation = {
    string: string;
    fn?:EquationFunction;
}

export type {Equation, EquationFunction}