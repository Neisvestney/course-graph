import React, {Ref, useCallback, useEffect} from 'react';

type State = {
    graph?: HTMLCanvasElement;
    graphCtx?: CanvasRenderingContext2D
};

type Props = {
    data: Array<{x: number, y: number}>
}

function Graph(props: Props) {
    const [state, setState] = React.useState<State>({});

    const onGraphRefChange = useCallback((graph: HTMLCanvasElement) => {
        if (graph) {
            const ctx = graph.getContext('2d');
            if (ctx) {
                setState({graph, graphCtx: ctx})
            }
        }
    }, []);

    useEffect(() => {
        const {graphCtx, graph} = state;
        if (graphCtx && graph) {
            graphCtx.imageSmoothingEnabled = false;

            graphCtx.clearRect(0, 0, graph.width, graph.height)

            let offsetX = graph.width/2;
            let offsetY = graph.height/2;

            const x = (xCoord: number) => offsetX + xCoord;
            const y = (yCoord: number) => offsetY + (-yCoord);

            // Drawing grid
            graphCtx.lineWidth = 1;
            graphCtx.strokeStyle = 'rgba(135,135,135,0.4)'
            for (let i = -10; i <= 10; i+=10) {
                graphCtx.rect(x(i), y(50), 1, 100)
                graphCtx.fill()
            }

            graphCtx.strokeStyle = 'rgba(255,255,255,0.7)'
            graphCtx.fillStyle = 'rgb(227,40,40)'
            graphCtx.lineWidth = 3;

            // Drawing lines
            graphCtx.beginPath();
            for (const i in props.data) {
                const dot = props.data[i];
                if (i === '0') graphCtx.moveTo(x(dot.x), y(dot.y));
                else graphCtx.lineTo(x(dot.x), y(dot.y));
            }
            graphCtx.stroke();

            // Drawing dots
            for (const dot of props.data) {
                graphCtx.beginPath();
                graphCtx.arc(x(dot.x), y(dot.y), 2, 0, 2 * Math.PI)
                graphCtx.fill();
            }
        }
    }, [props, state])

    return (
        <canvas ref={onGraphRefChange} id={"graph"}/>
    );
}

export default Graph;
