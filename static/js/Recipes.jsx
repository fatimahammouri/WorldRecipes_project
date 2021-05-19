"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown,
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner, LinkButton} = ReactBootstrap;

function Recipe(props){
    const { title, servings, readyInMinutes,instructions, image, ingredients, sourceUrl } = props;
    return(
        // <div>
        //     <h2> {title} </h2>
        //     <p> {servings} - {readyInMinutes} </p>
        //     <p> {instructions} - {ingredients} </p>
        //     <a href={sourceUrl}>recipe source</a>
        //     <img src={image} />
        
        // </div> 
        <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text> {servings} - {readyInMinutes}</Card.Text>
                <Button><a href={sourceUrl}> RECIPE SOURCE </a></Button>
                </Card.Body>
        </Card>

    )
}

function Recipes(props){
    const [recipeData, setRecipeData] = React.useState(null)
    React.useEffect(() => {
      fetch('/api/recipes')
        .then(response => response.json())
        .then(recipeData => setRecipeData(recipeData))
    }, [])
    if (!recipeData) {
      return <div>Loading...</div>
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

    function addNewRecipe() {
      fetch("/add_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ title, cuisine, servings, 
                              readyInMinutes, ingredients, instructions}),
      })
      .then((response) => { 
          response.json().then((jsonResponse) => {
          const { recipeAdded: { recipe_id, title, cuisine, servings, 
                  readyInMinutes, ingredients, instructions } } = jsonResponse;
          props.addCard(recipe_id, title, cuisine, servings, readyInMinutes,
                          ingredients, instructions);
        });
      });
    }

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
      
      <button onClick={addNewRecipe}> Add my Recipe </button>
    </React.Fragment>
  );
}

function RecipeDb(props){
  const {title, cuisine, servings, 
    readyInMinutes, ingredients, instructions } = props;
  return(
      <div>
          <h2> {title} </h2>
          <p>  {cuisine} - {servings} - {readyInMinutes} - {ingredients}-{instructions}</p>
      </div> 

  )
}


function RecipeCardContainer() {
  const [cards, setCards] = React.useState([]);

  function addCard(recipe_id, title, cuisine, servings, readyInMinutes,
                          ingredients, instructions) {
    const newCard = { recipe_id, title, cuisine, servings, readyInMinutes,
                      ingredients, instructions}; 
    const currentCards = [...cards]; 
    setCards([...currentCards, newCard]);
  }

  React.useEffect(() => {
    fetch("/recipes_cards.json")
      .then((response) => response.json())
      .then((data) => setCards(data.cards));
  }, []);

  const recipesCards = [];

  for (const currentCard of cards) {
    recipesCards.push(
      <RecipeDb
        key={currentCard.recipe_id}
        title={currentCard.title}
        cuisine={currentCard.cuisine}
        servings={currentCard.servings}
        readyInMinutes={currentCard.readyInMinutes}
        ingredients={currentCard.ingredients}
        instructions={currentCard.instructions}
      />
    );
  }

  return (
    <React.Fragment>
      <CreateRecipes addCard={addCard} />
      <h2>Recipes cards</h2>
      <div>{recipesCards}</div>
    </React.Fragment>
  );
}

// ReactDOM.render(<RecipeCardContainer />, document.getElementById("root"));