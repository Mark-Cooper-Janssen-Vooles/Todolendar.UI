import React from 'react';
import Landing from "./components/Landing/Landing";
import TodolenderHome from "./components/TodolenderHome/TodolenderHome";

const App = () => {
    const loggedIn = true; // todo: grab this from redux state

    return (
        <div>
            { !loggedIn && <Landing /> }
            { loggedIn && <TodolenderHome />}
        </div>
    );
}

export default App;
