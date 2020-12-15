import React from 'react';
import ReactDOMServer from 'react-dom/server';
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
            'pokeInfo': null
        }
    }

    onTextFieldChange(e) {
        this.setState({
            'pokeName': e.target.value,
            'pokeInfo': this.state.pokeInfo
        })
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
                                'pokeInfo': pokeInfo
                            })
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
                <Information pokeInfo={this.state.pokeInfo} />
            </React.Fragment>
        )
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
                'pokeInfo': pokeInfo
            })
        }).catch((error) => {
            console.log(error);
            lblErr.innerHTML = "Please enter a valid pokemon name!";
        })
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

