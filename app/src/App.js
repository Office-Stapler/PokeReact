import React from 'react';
import SearchComponent from './components/search/Search.js';
import Header from './components/header/header.js';
import './App.css';

export default function App() {
    return (
        <React.Fragment>
            <Header />
            <SearchComponent />
        </React.Fragment>
    )
}


