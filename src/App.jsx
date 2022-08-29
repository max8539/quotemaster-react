import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Index from "./routes/index.jsx";

import * as config from "../config.js";
import './App.css'

const PageTitle = styled.h1`
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    line-height: 16px;
`


const NoApi = styled.div`
    width: 360px;
    margin: auto;
    padding: 10px;
    text-align: center;
    background-color: #ffaaaa;
`


async function doHandshake (updateFunc) {
    let handshake;
    try {
        handshake = await fetch(`${config.API_HOST}/handshake`);
        if (handshake.ok) {
            return updateFunc(true);
        } else {
            return updateFunc(false);
        }
    } catch {
        return updateFunc(false);
    }
}

function RouterView () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
        </BrowserRouter>
    )
}

function Content () {
    const [apiOnlineState, apiOnlineUpdate] = useState(true);
    
    doHandshake(apiOnlineUpdate);
    if (apiOnlineState) {
        return (
            <RouterView />
        )
    } else {
        return (
            <NoApi>
                <p>Unable to reach API server.</p>
                <button onClick={() => doHandshake(apiOnlineUpdate)}>Retry</button>
            </NoApi>
        )
    }

}

export default function App() {
    

    return (
        <div className="App">
            <PageTitle>Quotemaster</PageTitle>
            <p>React build v0.1.0</p>
            <Content />
        </div>
    )
}

