import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BGHeader from "./images/bg-header-desktop.svg"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>

        <div className="header">
            <img className="bg-header" src={BGHeader} alt=""></img>
        </div>
        <App/>
    </React.StrictMode>
);

