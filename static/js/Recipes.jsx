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
}