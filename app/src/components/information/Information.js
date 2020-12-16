import React from 'react';

import './information.css';




export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.pokeAPI = 'https://pokeapi.co/api/v2/';
        this.colours = {
            "hp": "green",
            'attack': "darkred",
            "defense": "darkblue",
            "special-attack": "red",
            "special-defense": "blue",
            "speed": "yellow"
        }
        this.typeColours = {
            'poison': 'pink',
            'ghost': 'purple'
        }
    }

    render() {
        this.info = this.props.pokeInfo;
        if (this.props.pokeInfo != null) {
            return (
                <div className="info">
                    <div className="NameAndImage">
                        <h2>{this.getPokeName()}, id {this.info.id}</h2>
                        <div className="image">
                            <img src={this.info.sprites.other['official-artwork']['front_default']}></img>
                        </div>
                    </div>
                    <div className="StatAndTypes">
                        <table className="stats">
                            <tbody>
                                <tr>
                                    <th>Base Stats</th>
                                </tr>
                                {this.getStats()}
                            </tbody>
                        </table>
                        <div className="types">
                            {this.getTypes()}
                        </div>
                        <table className="typeEffectiveness">
                            <tbody>
                                <tr>
                                    <th>Type effectiveness</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        return '';
    }

    getPokeName() {
        return this.capitalize(this.info.name);
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getTypes() {
        this.types = this.info.types;
        let parts = []

        for (let type of this.types) {
            let image = process.env.PUBLIC_URL + `/types_images/${type.type.name}.png`;
            console.log(image);
            parts.push(
                <img src={image}></img>
            );
        }
        return parts;
    }

    getStats() {
        this.stats = this.info.stats;
        let rows = []
        for (let stat of this.stats) {
            rows.push(
            <tr>
                <td>
                    <div 
                    style={{
                        float: "left"
                    }}
                    >{this.capitalize(stat.stat.name)}</div>
                    <div style={{
                        float: "right"
                    }}>{stat['base_stat']}</div>
                </td>
                <td className="statLabel">
                    <div className="statbar" style= {{
                            width: stat['base_stat'] / 255 * 100,
                            backgroundColor: this.colours[stat.stat.name],
                            border: "1px solid black",
                            height: "20px"
                        }
                    }
                    >
                    </div>
                </td>
            </tr>);
        }
        return rows;
    }
}