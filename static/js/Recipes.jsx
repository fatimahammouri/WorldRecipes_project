"use strict";

function Recipe(props){
    const { title, servings, readyInMinutes,instructions, image, ingredients, sourceUrl } = props;
    return(
        <div>
            <h2> {title} </h2>
            <p> {servings} - {readyInMinutes} </p>
            <p> {instructions} - {ingredients} </p>
            <a href={sourceUrl}>recipe source</a>
            <img src={image} />
        
        </div> 

    )
}

function Recipes(props){
    const [recipeData, setRecipeData] = React.useState(null);
    React.useEffect(() => {
        fetch('/api/recipes')
        .then(response => response.json())
        .then(recipeData => setRecipeData(recipeData))
      }, [])

      if (!recipeData) {
          return (<div> Loading... </div>)
      }

    return(
        recipeData.map(recipe =>
        <Recipe 
        title={recipe.title}
        servings={recipe.servings}
        readyInMinutes={recipe.readyInMinutes}
        instructions={recipe.instructions}
        ingredients={recipe.ingredients}
        sourceUrl={recipe.sourceUrl}
        image={recipe.image}
        />)
        
    );
}

function CreateRecipes(props){
    const [title, setTitle] = React.useState("");
    const [cuisine, setCuisine] = React.useState("");
    const [servings, setServings] = React.useState(0);
    const [readyInMinutes, setReadyInMinutes] = React.useState(0);
    const [ingredients, setIngredients] = React.useState([]);
    const [instructions, setInstructions] = React.useState("");
return (
    <React.Fragment>
      <h2> Create a recipe </h2>

      <label> Recipe Title </label>
      <input id="titleInput" value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      
      <label> Recipe Cuisine </label>
      <input id="cuisineInput" value={cuisine}
        onChange={(event) => setCuisine(event.target.value)}
      ></input>

      <label> Servings Number </label>
      <input id="servingsInput" value={servings} type="number"
        onChange={(event) => setServings(event.target.value)}
      ></input>
     
      <label> Minutes to be ready </label>
      <input id="readyInMinutes" value={readyInMinutes} type="number"
        onChange={(event) => setReadyInMinutes(event.target.value)}
      ></input>
      
      <label> Needed Ingredients </label>
      <input id="ingredientsInput" value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
      ></input>
      
      <label> instructions </label>
      <input id="instructionsInput" value={instructions} type="text"
        onChange={(event) => setInstructions(event.target.value)}
      ></input>
      
      <button> Add my Recipe </button>
    </React.Fragment>
  );
}
