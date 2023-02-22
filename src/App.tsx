import React from 'react';
import Landing from "./components/Landing/Landing";
import TodolenderHome from "./components/TodolenderHome/TodolenderHome";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";

const App = () => {
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn)

    return (
        <div>
            { !loggedIn && <Landing /> }
            { loggedIn && <TodolenderHome />}
        </div>
    );
}

export default App;
