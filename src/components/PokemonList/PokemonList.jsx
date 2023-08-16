import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import "./pokemonList.css"

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] =useState(true);


        async function downloadPokemon(){
            const response = axios.get("https://pokeapi.co/api/v2/pokemon")
            const pokemonResults = (await response).data.results
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
            const pokemonData = await axios.all(pokemonResultPromise)
            console.log(await pokemonData);
            setIsLoading(false)
        }

    useEffect( () =>{
        downloadPokemon()
    })
    
    return(
        <div className="pokemon-list-wrapper">
                <div>pokemonList </div>
                {(isLoading) ? 'Loading...' : 'Data_downloaded'}
        </div>
    )
}
export default PokemonList;