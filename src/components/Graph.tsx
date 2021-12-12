import React, { Ref, useCallback, useEffect } from 'react';
import {Equation} from "../Types";

type State = {
    graph?: HTMLCanvasElement;
    graphCtx?: CanvasRenderingContext2D;
    graphOffset: { x?: number, y?: number };
    graphScale: number,
    gridPadding: number,
};

type Props = {
    equation: Equation;
}

function Graph(props: Props) {
    const [state, setState] = React.useState<State>({ graphOffset: {}, graphScale: 30, gridPadding: 1 });

    const onGraphRefChange = useCallback((graph: HTMLCanvasElement) => {
        if (graph) {
            const ctx = graph.getContext('2d');
            if (ctx) {
                setState({ ...state, graph, graphCtx: ctx });
            }
        }
    }, []);

    const onGraphMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (state.graphOffset.x && state.graphOffset.y && e.buttons === 1) {
            setState({
                ...state,
                graphOffset: {
                    x: state.graphOffset.x + e.movementX * (1 / state.graphScale),
                    y: state.graphOffset.y + e.movementY * (1 / state.graphScale)
                },
            });
        }
    };

    const onGraphScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
        const newScale = state.graphScale - e.deltaY * 0.001 * state.graphScale;
        if (newScale > 0.1) setState({...state, graphScale: newScale})
    }

    useEffect(() => {
        const { graphCtx, graph } = state;
        if (graphCtx && graph) {
            const ctx = graphCtx;

            // Syncing real sizes
            graph.width = graph.offsetWidth;
            graph.height = graph.offsetHeight;

            ctx.clearRect(0, 0, graph.width, graph.height);

            if (!state.graphOffset.x || !state.graphOffset.y) {
                setState({
                    ...state,
                    graphOffset: { x: graph.width * (1/state.graphScale) / 2, y: graph.height * (1/state.graphScale) / 2 },
                });
                return;
            }

            const offsetX = state.graphOffset.x;
            const offsetY = state.graphOffset.y;

            const gridPadding = (state.gridPadding * state.graphScale);

            const x = (xCoord: number) => Math.round((offsetX + xCoord ) * state.graphScale);
            const y = (yCoord: number) => Math.round((offsetY + (-yCoord)) * state.graphScale);

            // Drawing grid
            if (state.graphScale > 0.3) {  // Temporally
                ctx.fillStyle = 'rgb(90,90,90)';
                for (let i = 0; i <= graph.width; i += gridPadding) {
                    const xCoord = Math.round(i + (x(0) % gridPadding))
                    ctx.rect(xCoord, 0, xCoord === x(0) ? 2 : 1, graph.height);
                    ctx.fill();
                }
                for (let i = 0; i <= graph.height; i += gridPadding) {
                    const yCoord = Math.round(i + (y(0) % gridPadding))
                    ctx.rect(0, yCoord, graph.width, yCoord === y(0) ? 2 : 1);
                    ctx.fill();
                }
            }


            // Drawing lines
            // ctx.strokeStyle = 'rgba(255,255,255,0.7)'
            // ctx.fillStyle = 'rgb(227,40,40)'
            // ctx.lineWidth = 3;
            //
            // ctx.beginPath();
            // for (const i in props.data) {
            //     const dot = props.data[i];
            //     if (i === '0') ctx.moveTo(x(dot.x), y(dot.y));
            //     else ctx.lineTo(x(dot.x), y(dot.y));
            // }
            // ctx.stroke();

            // Drawing dots
            ctx.fillStyle = 'rgb(227,40,40)';

            // for (const dot of props.data) {
            //     ctx.beginPath();
            //     ctx.arc(x(dot.x), y(dot.y), 2, 0, 2 * Math.PI);
            //     ctx.fill();
            //     ctx.closePath();
            // }

            const invertedGraphScale = 1 / state.graphScale;

            if (props.equation.fn) {
                for (let i = -offsetX; i <= graph.width * invertedGraphScale - offsetX; i += invertedGraphScale) {
                    ctx.beginPath();
                    ctx.arc(x(i), y(props.equation.fn({x: i})), 2, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.closePath();
                }
            }

            // Drawing text
            ctx.font = `${Math.min(Math.round(0.5 * state.graphScale), 24)}px sans-serif`;
            ctx.fillStyle = 'rgb(255, 255, 255)'
            //ctx.fillText("0", x(0), y(0), 24)
            console.log(offsetX, state.graphScale, x(0))
            for (let i = -gridPadding; i <= graph.width; i += gridPadding) {
                const xCoord = Math.round(i + (x(0) % gridPadding))
                ctx.fillText(Math.round(xCoord/state.graphScale - offsetX).toString(), xCoord, y(0))
            }
            for (let i = -gridPadding; i <= graph.height; i += gridPadding) {
                const yCoord = Math.round(i + (y(0) % gridPadding))
                ctx.fillText(Math.round(offsetY - yCoord/state.graphScale).toString(), x(0), yCoord)
            }

            // Drawing frame
            ctx.strokeStyle = 'rgb(90,90,90)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.rect(0, 0, graph.width, graph.height);
            ctx.stroke();
            ctx.closePath();
        }
    }, [props, state]);

    return (
        <canvas ref={onGraphRefChange} id="graph" onMouseMove={onGraphMove} onWheel={onGraphScroll}/>
    );
};

export default Graph;
