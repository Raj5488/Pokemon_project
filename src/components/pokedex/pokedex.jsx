import PokemonList from "../PokemonList/PokemonList";
import Search from "../search/search";
// Here is css import
import "./pokedex.css"
function Pokedex(){
    return(
        <div className="pokedex-wrapper">
            <h1 id="pokedex-header">Pokedex</h1>
        <Search />
        <PokemonList />
        </div>
        
    )
}
export default Pokedex;