import React from 'react';
import Move from './MovesTable/Move.js';
import {capitalize} from '../utils/stringUtils'
import './information.css';
import {MovesTable} from "./MovesTable/MovesTable";

import {statColour, statBackColour, typeColours, gameVersionColours} from "../utils/colours";

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.pokeAPI = 'https://pokeapi.co/api/v2/';


    }

    render() {
        this.info = this.props.pokeInfo;
        if (this.info !== null) {
            return (
                <div className="info">
                    <div className="NameImageType">
                        <p className="displayP">{this.getPokeName()} (id {this.info.id})</p>
                        <div className="image">
                            <img alt="Error loading pokemon" src={this.info.sprites.other['official-artwork']['front_default']}/>
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
                    <div className="pokemonMoves">
                        <p className="displayP">Pokemon Moves</p>
                        {this.getPokemonmoves()}
                    </div>
                </div>

            )
        }
        return '';
    }

    getPokeName() {
        return capitalize(this.info.name);
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
                            backgroundColor: typeColours[relation],
                            color: "black",
                            textAlign: "center",
                            borderRadius: "10px",
                        }}>
                            {capitalize(relation)}
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
                            <td style={{
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
                    backgroundColor: statColour[stat.stat.name],
                    height: "10px",
                    textAlign: "left"
                }}>
                    <td style={{
                        float: "left",
                        width: 255
                    }}>
                        {capitalize(stat.stat.name)}
                    </td>
                    <td style={{
                        float: "right"
                    }}>
                        {stat['base_stat']}
                    </td>
                    <td className="statLabel">
                        <div style={{
                            width: stat['base_stat'] / 255 * 100,
                            backgroundColor: statBackColour[stat.stat.name],
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
        let versions = [];
        for (let entry of this.props.pokedex_entries) {
            let version = entry.version.name;
            if (entry.language.name === "en" && !versions.includes(version)) {
                entries.push(
                    <tr key={version}>
                        <th>
                            <div style={{
                                backgroundColor: version in gameVersionColours ? gameVersionColours[version].back : "black",
                                color: version in gameVersionColours ? gameVersionColours[version].fore : "white",
                                borderRadius: "1em",
                                height: "2em",
                                lineHeight: "2em"
                            }}>
                                {capitalize(version)}
                            </div>
                        </th>
                        <td style={{
                            textAlign: "center"
                        }}>
                            <div className="entryDiv">
                                {entry.flavor_text}
                            </div>
                        </td>
                    </tr>
                )
                versions.push(version);
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

    getPokemonmoves() {
        let moves = this.props.pokeInfo.moves;
        let displayedMoves = moves.map((elem) => {
            return (
                <Move
                    url={elem.move.url}
                    name={elem.move.name}
                />
            )
        })
        return <MovesTable moves={displayedMoves} />;
    }
}