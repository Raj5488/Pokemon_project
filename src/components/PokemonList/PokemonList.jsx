import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'


function PokemonList(){

        async function downloadPokemon(){
            const response = axios.get("https://pokeapi.co/api/v2/pokemon")
            console.log(response);
        }



    useEffect( () =>{
        downloadPokemon()
    })

    
    return(
        <div className="pokemon-list-wrapper">
                pokemonList
        </div>
    )
}
export default PokemonList;