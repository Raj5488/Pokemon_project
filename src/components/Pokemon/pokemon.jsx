import "./pokemon.css"
function Pokemon({name, image}){
    return(
        <div className="pokemon">
            <div>{name}</div>
            
            <div className="pokemon_image">
            <img src= {image} />
            </div>
        </div>
    )
}
export default Pokemon;