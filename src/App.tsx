import React from 'react';
import Landing from "./components/Landing";
import TodolenderHome from "./components/TodolenderHome";
import './App.css';

const App = () => {
    const loggedIn = false;

    return (
        <div className="App">
            { !loggedIn &&
                <Landing />
            }

            {
                loggedIn && <TodolenderHome />
            }
        </div>
    );
}

export default App;
