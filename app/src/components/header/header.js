import React from 'react';
import pokedex from '../../data/pokedex.png';
import './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <h1>Pokedex</h1>
                <img src={pokedex} width="57.25" height="67.75"></img>
            </div>
        )
    }
}