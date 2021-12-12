import {Link} from "react-router-dom";

function NotFound() {
    return (
        <>
            <p>Страница не найдена</p>
            <Link to={'/'}>На главную</Link>
        </>
    );
}

export default NotFound;
