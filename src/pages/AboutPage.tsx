import logo from '../logo64.png'

function AboutPage() {
    return (
        <>
            <img src={logo} alt={''}/>
            <p style={{marginBottom: 0}}>Простое приложение для построения графиков по уравнению</p>
            <p>JS, React, TypeScript, MathJS</p>
            <a href={"https://github.com/Neisvestney/course-graph"}>GitHub</a>
        </>
    );
}

export default AboutPage;
