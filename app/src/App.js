import React from 'react';
import './App.css';
import {
    TextField,
    Button
} from '@material-ui/core';

export default function App() {
    return (
        <React.Fragment>
        <TextField
            id="txtPokeName"
            variant="outlined"
            label="Enter Pokemon Name: "
            color="secondary"
        />
        <p id="error"></p>
        <div className="buttons">
            <Button onClick={() => {
                    const txtField = document.getElementById('txtPokeName');
                    const lblErr = document.getElementById('error');
                    const body = document.getElementById('image');
                    let id = 1;
                    if (body.innerHTML !== '') {
                        let child = body.childNodes[0];
                        id = parseInt(child.id.replace('poke-', ''));
                    }
                    if (id === 1)
                        return;
                    body.innerHTML = '';
                    const pokeAPI = 'https://pokeapi.co/api/v2/';
                    lblErr.innerHTML = '';

                    fetch(`${pokeAPI}pokemon/${id - 1}`)
                    .then(response => {
                        return response.json();
                    }).then(pokeInfo => {
                        let img = document.createElement('img');
                        img.src = pokeInfo.sprites.other['official-artwork']['front_default'];
                        img.id = `poke-${pokeInfo.id}`
                        txtField.value = pokeInfo.name;
                        body.appendChild(img);
                    }).catch((error) =>
                    lblErr.innerHTML = "Please enter a valid pokemon name!");
            }}
            variant="contained">{'<'}</Button>
            <Button onClick={() => {
                const txtField = document.getElementById('txtPokeName');
                const lblErr = document.getElementById('error');
                const body = document.getElementById('image');
                body.innerHTML = '';
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
                    let img = document.createElement('img');
                    img.src = pokeInfo.sprites.other['official-artwork']['front_default'];
                    img.id = `poke-${pokeInfo.id}`
                    body.appendChild(img);
                }).catch((error) =>
                lblErr.innerHTML = "Please enter a valid pokemon name!");
                
            }}
            variant="contained">Search </Button>
            <Button onClick={() => {
                    const txtField = document.getElementById('txtPokeName');
                    const lblErr = document.getElementById('error');
                    const body = document.getElementById('image');
                    let id = 0;
                    if (body.innerHTML !== '') {
                        let child = body.childNodes[0];
                        id = parseInt(child.id.replace('poke-', ''));
                    }
                    if (id === 894)
                        return;
                    body.innerHTML = '';
                    const pokeAPI = 'https://pokeapi.co/api/v2/';
                    lblErr.innerHTML = '';

                    fetch(`${pokeAPI}pokemon/${id + 1}`)
                    .then(response => {
                        return response.json();
                    }).then(pokeInfo => {
                        let img = document.createElement('img');
                        img.src = pokeInfo.sprites.other['official-artwork']['front_default'];
                        img.id = `poke-${pokeInfo.id}`
                        txtField.value = pokeInfo.name;
                        txtField.label = '';
                        body.appendChild(img);
                    }).catch((error) =>
                    lblErr.innerHTML = "Please enter a valid pokemon name!");
            }}
            variant="contained">{'>'}</Button>
        </div>
        
        <div id="image" className="image"></div>
        </React.Fragment>
    )
}


