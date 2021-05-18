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
    return(
        <div>
            Recipes from API will be here
        </div>
    );
}