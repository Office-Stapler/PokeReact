import React from 'react';

import './information.css';




export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.pokeAPI = 'https://pokeapi.co/api/v2/';
        this.colours = {
            "hp": "lightgreen",
            'attack': "#ff9c9c",
            "defense": "#add8e6",
            "special-attack": "#ffd19c",
            "special-defense": "#9c9eff",
            "speed": "#f279c4"
        }

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
        if (this.info !== null) {
            return (
                <div className="info">
                    <div className="NameImageType">
                        <p className="displayP">{this.getPokeName()} (id {this.info.id})</p>
                        <div className="image">
                            <img alt="Error loading pokemon" src={this.info.sprites.other['official-artwork']['front_default']}></img>
                            {this.getTypes()}
                        </div>
                        
                    </div>
                    <div className="statWrapper">
                        <div>
                            <p className="displayP">Base Stats</p>
                            <table className="table">
                                <tbody>
                                    {this.getStats()}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p className="displayP">Type Effectiveness</p>
                            {this.getEffectiveness()}
                        </div>
                    </div>
                    <div className="pokedexEntry">
                        <p className="displayP">Pokedex Entries</p>
                        {this.getPokedexEntries()}
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
                <img alt="Error loading pokemon type" key={type.type.name} src={image}></img>
            );
        }
        return (
            <div>
                {parts}
            </div>
        );
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
                let info = (                        
                    <tr key={relation}>
                        <td style={{
                            backgroundColor: this.typeColours[relation],
                            color: "black",
                            textAlign: "center",
                            borderRadius: "10px",
                        }}>
                            {this.capitalize(relation)}
                        </td>
                        <td>
                            x{num}
                        </td>
                    </tr>
                )
                if (num === 0) {
                    immuneAgainst.push(info);
                } else if (num < 1) {
                    strongAgainst.push(info);
                } else if (num > 1) {
                    weakAgainst.push(info);
                } else {
                    neutralAgainst.push(info);
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
                    {immuneAgainst.length !== 0 ? immuneAgainst : (                   
                        <tr key="None">
                            <td  style={{
                                backgroundColor: 'black',
                                borderRadius: 3,
                                textAlign: "center",
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
            <tr key={stat.stat.name} style={{ 
                backgroundColor: this.colours[stat.stat.name],
                height: "10px",
                textAlign: "left"
            }}>
                <td style={{
                    float: "left",
                    width: 255
                }}>
                    {this.capitalize(stat.stat.name)}
                </td>
                <td style={{
                        float: "right"
                }}>
                    {stat['base_stat']}
                </td>
                <td className="statLabel">
                    <div style= {{
                        width: stat['base_stat'] / 255 * 100,
                        backgroundColor: this.backgroundColors[stat.stat.name],
                        border: "1px solid black",
                        height: "20px",
                    }}>
                    </div>
                </td>
            </tr>);
        }
        return rows;
    }

    getPokedexEntries() {
        let entries = [];
        for (let entry of this.props.pokedex_entries) {
            if (entry.language.name === "en") {
                entries.push(
                    <tr>
                        <th>
                            <div className="pokedexDiv">
                                {this.capitalize(entry.version.name)}
                            </div>
                        </th>
                        <td style = {{
                            textAlign: "center"
                        }}>
                            <div className="entryDiv">
                                {entry.flavor_text}
                            </div>
                        </td>
                    </tr>
                )
            }
        }

        return (
            <table className="table2">
                <tbody>
                    {entries}
                </tbody>
            </table>
        )
    }
}