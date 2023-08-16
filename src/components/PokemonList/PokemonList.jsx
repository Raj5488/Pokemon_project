import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import "./pokemonList.css"
import Pokemon from "../pokemon/pokemon";

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] =useState(true);

        const [pokedex_url, setPokexurl] = useState("https://pokeapi.co/api/v2/pokemon"); // this daunlods list of 20 pokemon
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

        async function downloadPokemon(){
            isLoading(true)
            // passing the array axious all
            const response = axios.get(pokedex_url)
            const pokemonResults = (await response).data.results; // we get the array of pokemons from result
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            setNextUrl((await response).data.next);
            setPrevUrl((await response).data.prev)
            console.log((await response).data);


            // iterating over the array of pokemons, and using heir url, to create an array of prmmises
            // that willl daunlod those 20 pokemons
            const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokemon detailed data
            console.log(await pokemonData);
            // now iterate on the data of each pokemonand extract id, name, image, types
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name, 
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types: pokemon.types
                    }
            })
            console.log(pokeListResult);
            setPokemonList(pokeListResult);
            setIsLoading(false)
        }

    useEffect( () =>{
        downloadPokemon()
    })
    
    return(
        <div className="pokemon-list-wrapper">
                <div>pokemon List</div>
                {(isLoading) ? 'Loading...':
                    pokemonList.map((p) => <Pokemon name= {p.name} image = {p.image} key = {p.key}/> )
                    }

                <div className="contorls">
                    <button disabled={prevUrl == null} onClick={() =>setPokexurl(prevUrl)} >Prev</button>
                    <button disabled={nextUrl == null} onClick={() =>setNextUrl(nextUrl)}>Next</button>
                </div>
        </div>
    )
}
export default PokemonList;