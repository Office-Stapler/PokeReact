import React from 'react';

import './information.css';




export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.pokeAPI = 'https://pokeapi.co/api/v2/';
        let damage_relations = {};
        this.colours = {
            "hp": "lightgreen",
            'attack': "#ff9c9c",
            "defense": "#add8e6",
            "special-attack": "#ffd19c",
            "special-defense": "#9c9eff",
            "speed": "#f279c4"
        }
        
        this.state = {
            'damage_relations': damage_relations
        };

        this.backgroundColors = {
            "hp": "green",
            'attack': "#ff3636",
            "defense": "#14acde",
            "special-attack": "#ff9f30",
            "special-defense": "#4246ff",
            "speed": "#ed28a2"
        }

        this.typeColours = {
            'normal': "#A8A878",
            'poison': '#A040A0',
            'ground': '#E0C068',
            'rock': '#B8A038',
            'bug': '#A8B820',
            'ghost': '#705898',
            'steel': '#B8B8D0',
            'dragon': '#7038F8',
            'dark': '#705848',
            'flying': '#A890F0',
            'fire': '#F08030',
            'psychic': '#F85888',
            'ice': '#98D8D8',
            'fighting': '#C03028',
            'water': '#6890F0',
            'grass': '#78C850',
            'electric': '#F8D030',
            'fairy': '#EE99AC'
        }
    }
    render() {
        this.info = this.props.pokeInfo;
        if (this.info != null) {
            return (
                <div className="info">
                    <div className="NameImageType">
                        <h2>{this.getPokeName()}, id {this.info.id}</h2>
                        <div className="image">
                            <img src={this.info.sprites.other['official-artwork']['front_default']}></img>
                        </div>
                        {this.getTypes()}
                    </div>
                    <div className="statWrapper">
                        <p className="baseStatP">Base Stats</p>
                        <table className="table">
                            <tbody className="StatAndTypes">
                                {this.getStats()}
                            </tbody>
                            <tbody className="typeEffectiveness">
                                <tr>
                                    <th>Type effectiveness</th>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="typeEffectiveness">
                                    {this.getEffectiveness()}
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
            parts.push(
                <img key={type.type.name} src={image}></img>
            );
        }
        return parts;
    }



    getEffectiveness() {
        let table = [];
        let weakAgainst = [];
        let strongAgainst = [];
        let neutralAgainst = [];
        let immuneAgainst = [];
        console.log(this.props['damage_relations'])
        for (let relation in this.props['damage_relations']) {
            let damage_relations = this.props['damage_relations'];
            if (damage_relations.hasOwnProperty(relation)) {
                let num = damage_relations[relation];
                if (num < 1) {
                    strongAgainst.push(
                        <td key={relation}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Weak to</th>
                                        <td>
                                            x{num}-{this.capitalize(relation)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    )
                }
            }
        }
        return (
            <div>
                <table>
                    {strongAgainst}      
                </table>
            </div>
        );
    }



    getStats() {
        this.stats = this.info.stats;
        let rows = []
        for (let stat of this.stats) {
            rows.push(
            <tr key={stat.stat.name} style={{backgroundColor: this.colours[stat.stat.name]}}>
                <td style={{
                    float: "left",
                    width: 255
                }}>
                    {this.capitalize(stat.stat.name)}
                </td>
                <td style={{
                        float: "right"
                }}>{stat['base_stat']}
                </td>
                <td className="statLabel">
                    <div
                    style= {{
                    width: stat['base_stat'] / 255 * 100,
                    backgroundColor: this.backgroundColors[stat.stat.name],
                    border: "1px solid black",
                    height: "20px"
                    }}>
                    </div>
                </td>
            </tr>);
        }
        return rows;
    }
}