import React from 'react';
import Landing from "./components/Landing/Landing";
import TodolenderHome from "./components/TodolenderHome/TodolenderHome";
import './App.css';

const App = () => {
    const loggedIn = true; // todo: grab this from redux state

    return (
        <div className="App">
            { !loggedIn && <Landing /> }
            { loggedIn && <TodolenderHome />}
        </div>
    );
}

export default App;
