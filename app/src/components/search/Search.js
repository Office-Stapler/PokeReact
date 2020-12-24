import React from 'react';
import {
    TextField,
    Button
} from '@material-ui/core';

import Information from '../information/Information';

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'pokeName': '',
            'pokeInfo': null,
            'damage_relations': this.resetDamageRelations(),
            'pokedex_entries': []
        }
    }

    resetDamageRelations() {
        let damage_relations = {};
        let baseTypes = [
            'normal',
            'fire',
            'water',
            'electric',
            'grass',
            'ice',
            'fighting',
            'poison',
            'ground',
            'flying',
            'psychic',
            'bug',
            'rock',
            'ghost',
            'dragon',
            'dark',
            'steel',
            'fairy'
        ]
        for (let type of baseTypes) {
            damage_relations[type] = 1.0;
        }
        return damage_relations;
    }

    onTextFieldChange(e) {
        this.setState({
            'pokeName': e.target.value,
            'pokeInfo': this.state.pokeInfo,
            'damage_relations': this.state['damage_relations'],
            'pokedex_entries': this.state['pokedex_entries']
        });
    }

    render() {
        return (
            <React.Fragment>
                <TextField
                    id="txtPokeName"
                    variant="outlined"
                    helperText="Pokemon Name or ID"
                    value={this.state.pokeName}
                    color="secondary"
                    onChange={this.onTextFieldChange.bind(this)}
                />
                <p id="error"></p>
                <div className="buttons">
                    <Button 
                    onClick={() => {
                        this.clickButton(false);
                    }}
                    variant="contained">{'<'}
                    
                    </Button>
                    <Button onClick={() => {
                        const lblErr = document.getElementById('error');
                        const pokeAPI = 'https://pokeapi.co/api/v2/';
                        lblErr.innerHTML = '';
                        if (this.state.pokeName === '') {
                            lblErr.innerHTML = "Please at least enter a name!";
                            return;
                        }
                        fetch(pokeAPI + 'pokemon/' + this.state.pokeName.toLowerCase())
                        .then(response => {
                            return response.json();
                        }).then(pokeInfo => {
                            this.setState({
                                'pokeName': this.capitalize(pokeInfo.name),
                                'pokeInfo': pokeInfo,
                                'damage_relations': this.resetDamageRelations(),
                                'pokedex_entries': []
                            })
                            this.setEffectiveness();
                            this.findPokedexEntries();
                        }).catch((error) => {
                            console.log(error);
                            lblErr.innerHTML = "Please enter a valid pokemon name!";
                        });
                    }}
                    variant="contained">Search </Button>
                    <Button onClick={() => {
                        this.clickButton(true);
                    }}
                    variant="contained">{'>'}</Button>
                </div>
                <Information 
                    pokeInfo={this.state.pokeInfo} 
                    damage_relations={this.state.damage_relations} 
                    pokedex_entries={this.state.pokedex_entries}
                />
            </React.Fragment>
        )
    }

    setEffectiveness() {
        this.types = this.state.pokeInfo['types'];
        for (let type of this.types) {
            let damage_relations = this.state['damage_relations'];
            fetch(type.type.url)
            .then(response => response.json())
            .then((json) => {
                let relation = json['damage_relations'];
                let doubleEffective = relation['double_damage_from'];
                let halfEffective = relation['half_damage_from'];
                let immuneTo = relation['no_damage_from'];
                damage_relations = this.fit_relations(damage_relations, doubleEffective, 2);
                damage_relations = this.fit_relations(damage_relations, halfEffective, 0.5);
                damage_relations = this.fit_relations(damage_relations, immuneTo, 0);
                this.setState({
                    'pokeName': this.state.pokeName,
                    'pokeInfo': this.state.pokeInfo,
                    'damage_relations': damage_relations,
                    'pokedex_entries': []
                });
            });
        }
    }

    findPokedexEntries() {
        let speciesURL = this.state.pokeInfo.species.url;
        fetch(speciesURL)
        .then(response => {
            return response.json()
        })
        .then(json => {
            this.setState({
                'pokeName': this.state.pokeName,
                'pokeInfo': this.state.pokeInfo,
                'damage_relations': this.state.damage_relations,
                'pokedex_entries': json['flavor_text_entries']
            })
        })
    }

    fit_relations(damage_relations, typeList, multiple) {
        for (let type of typeList) {
            let name = type['name'];
            let num = damage_relations[name];
            damage_relations[name] = num * multiple;
        }
        return damage_relations;
    }

    clickButton(isNext) {
        const lblErr = document.getElementById('error');
        let id = 0;
        if (this.state.pokeInfo !== null) {
            id = this.state.pokeInfo.id;
        }
        if ((id === 1 && !isNext) || (id === 898 && isNext))
            return;
        const pokeAPI = 'https://pokeapi.co/api/v2/';
        lblErr.innerHTML = '';
        let currId = id + (isNext ? 1 : -1);
        fetch(`${pokeAPI}pokemon/${currId}`)
        .then(response => {
            return response.json();
        }).then(pokeInfo => {
            this.setState({
                'pokeName': this.capitalize(pokeInfo.name),
                'pokeInfo': pokeInfo,
                'damage_relations': this.resetDamageRelations(),
                'pokedex_entries': []
            })
            this.setEffectiveness()
            this.findPokedexEntries();
        }).catch((error) => {
            console.log(error);
            lblErr.innerHTML = "Please enter a valid pokemon name!";
        })
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

