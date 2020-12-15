import React from 'react';
import {
    TextField,
    Button
} from '@material-ui/core';

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'pokeName': ''
        }
    }

    onTextFieldChange(e) {
        this.setState({
            'pokeName': e.target.value
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
                        const txtField = document.getElementById('txtPokeName');
                        const lblErr = document.getElementById('error');
                        const body = document.getElementById('image');
                        const pokeAPI = 'https://pokeapi.co/api/v2/';
                        lblErr.innerHTML = '';
                        let input = txtField.value;
                        if (input === '') {
                            lblErr.innerHTML = "Please at least enter a name!";
                            return;
                        }
                        fetch(pokeAPI + 'pokemon/' + input)
                        .then(response => {
                            return response.json();
                        }).then(pokeInfo => {
                            body.innerHTML = '';
                            let img = document.createElement('img');
                            img.src = pokeInfo.sprites.other['official-artwork']['front_default'];
                            img.id = `poke-${pokeInfo.id}`
                            this.setState({
                                'pokeName': pokeInfo.name
                            })
                            body.appendChild(img);
                        }).catch((error) =>
                        lblErr.innerHTML = "Please enter a valid pokemon name!");
                    }}
                    variant="contained">Search </Button>
                    <Button onClick={() => {
                        this.clickButton(true);
                    }}
                    variant="contained">{'>'}</Button>
                </div>
                <div id="image" className="image"></div>
            </React.Fragment>
        )
    }

    clickButton(isNext) {
        const lblErr = document.getElementById('error');
        const body = document.getElementById('image');
        let id = 0;
        if (body.innerHTML !== '') {
            let child = body.childNodes[0];
            id = parseInt(child.id.replace('poke-', ''));
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
            body.innerHTML = '';
            let img = document.createElement('img');
            img.src = pokeInfo.sprites.other['official-artwork']['front_default'];
            img.id = `poke-${pokeInfo.id}`
            this.setState({
                'pokeName': pokeInfo.name
            })
            body.appendChild(img);
        }).catch((error) => {
            console.log(error);
            lblErr.innerHTML = "Please enter a valid pokemon name!";
        })
    }
}

