import React, { Ref, useCallback, useEffect } from 'react';

type State = {
    graph?: HTMLCanvasElement;
    graphCtx?: CanvasRenderingContext2D;
    graphOffset: { x?: number, y?: number };
    graphScale: number
};

type Props = {
    data: Array<{ x: number, y: number }>
}

const Graph = function (props: Props) {
    const [state, setState] = React.useState<State>({ graphOffset: {}, graphScale: 1 });

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
                graphOffset: { x: state.graphOffset.x + e.movementX, y: state.graphOffset.y + e.movementY },
            });
        }
    };

    const onGraphScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
        const newScale = state.graphScale - e.deltaY * 0.001;
        if (newScale > 0.1 && newScale < 2) setState({...state, graphScale: newScale})
    }

    useEffect(() => {
        const { graphCtx, graph } = state;
        if (graphCtx && graph) {
            console.log(state.graphOffset)
            const ctx = graphCtx;

            // Syncing real sizes
            graph.width = graph.offsetWidth;
            graph.height = graph.offsetHeight;

            ctx.clearRect(0, 0, graph.width, graph.height);

            if (!state.graphOffset.x || !state.graphOffset.y) {
                setState({
                    ...state,
                    graphOffset: { x: graph.width / 2, y: graph.height / 2 },
                });
                return;
            }

            const offsetX = state.graphOffset.x;
            const offsetY = state.graphOffset.y;

            const gridPadding = 20 * state.graphScale;

            const x = (xCoord: number) => (offsetX + xCoord ) * state.graphScale;
            const y = (yCoord: number) => (offsetY + (-yCoord)) * state.graphScale;

            console.log(state.graphScale, (1 - (state.graphScale - 1)))

            // Drawing grid
            if (state.graphScale > 0.3) {  // Temporally
                ctx.fillStyle = 'rgb(90,90,90)';
                for (let i = 0; i <= graph.width; i += gridPadding) {
                    ctx.rect(i + (x(0) % gridPadding), 0, 1, graph.height);
                    ctx.fill();
                }
                for (let i = 0; i <= graph.height; i += gridPadding) {
                    ctx.rect(0, i + (y(0) % gridPadding), graph.width, 1);
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

            for (const dot of props.data) {
                ctx.beginPath();
                ctx.arc(x(dot.x), y(dot.y), 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
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
