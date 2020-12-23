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
                        </table>
                        <p className="baseStatP">Type Effectiveness</p>
                        {this.getEffectiveness()}
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
        let weakAgainst = [];
        let strongAgainst = [];
        let neutralAgainst = [];
        let immuneAgainst = [];
        for (let relation in this.props['damage_relations']) {
            let damage_relations = this.props['damage_relations'];
            if (damage_relations.hasOwnProperty(relation)) {
                let num = damage_relations[relation];
                if (num < 1 && num != 0) {
                    strongAgainst.push(
                        <tr key={relation}>
                            <td style={{
                                backgroundColor: this.typeColours[relation],
                                borderRadius: 6
                            }}>
                                {this.capitalize(relation)}
                            </td>
                            <td>
                                x{num}
                            </td>
                        </tr>
                    )
                } else if (num > 1) {
                    weakAgainst.push(
                        <tr key={relation}>
                            <td  style={{
                                backgroundColor: this.typeColours[relation],
                                borderRadius: 6
                            }}>
                                {this.capitalize(relation)}
                            </td>
                            <td>
                                x{num}
                            </td>
                        </tr>   
                    )
                } else if (num == 1) {
                    neutralAgainst.push(
                        <tr key={relation}>
                            <td  style={{
                                backgroundColor: this.typeColours[relation],
                                borderRadius: 6
                            }}>
                                {this.capitalize(relation)}
                            </td>
                            <td>
                                x{num}
                            </td>
                        </tr>  
                    )
                } else {
                    immuneAgainst.push(
                        <tr key={relation}>
                            <td  style={{
                                backgroundColor: this.typeColours[relation],
                                borderRadius: 6
                            }}>
                                {this.capitalize(relation)}
                            </td>
                            <td>
                                x{num}
                            </td>
                        </tr>   
                    )
                }
            }
        }
        return (
            <table className="table1">
                <tbody className="relationData">
                    <tr>
                        <th>Strong against</th>
                    </tr>
                    {strongAgainst}
                </tbody>    
                <tbody className="relationData">
                    <tr>
                        <th>Weak to</th>
                    </tr>
                    {weakAgainst}
                </tbody>
                <tbody className="relationData">
                    <tr>
                        <th>Neutral to</th>
                    </tr>
                    {neutralAgainst}
                </tbody>
                <tbody className="relationData">
                    <tr>
                        <th>Immune to</th>
                    </tr>
                    {immuneAgainst.length != 0 ? immuneAgainst : (                   
                        <tr key="None">
                            <td  style={{
                                backgroundColor: 'black',
                                borderRadius: 6,
                                color: "white"
                            }}>
                                None
                            </td>
                        </tr>  
                    )}
                </tbody>
            </table>
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
                    <p
                    style= {{
                    width: stat['base_stat'] / 255 * 100,
                    backgroundColor: this.backgroundColors[stat.stat.name],
                    border: "1px solid black",
                    height: "20px",
                    }}>
                    </p>
                </td>
            </tr>);
        }
        return rows;
    }
}