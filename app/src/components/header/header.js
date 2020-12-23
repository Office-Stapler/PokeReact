import React from 'react';
import './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.pokedex = process.env.PUBLIC_URL + '/images/pokedex.png';
    }

    render() { 
        return (
            <div className="header">
                <h1>Pokedex</h1>
                <img src={this.pokedex} width="57.25" height="67.75" alt="Error pokedex couldn't be loaded"></img>
            </div>
        )
    }
}