function CreateRecipes(props){
    const [title, setTitle] = React.useState("");
    const [cuisine, setCuisine] = React.useState("");
    const [servings, setServings] = React.useState(0);
    const [readyInMinutes, setReadyInMinutes] = React.useState(0);
    const [ingredients, setIngredients] = React.useState([]);
    const [instructions, setInstructions] = React.useState("");

    // image uploaded (user File Input)
    const [fileInput, setFileInput] = React.useState("");
    const [previewSource, setPreviewSource] = React.useState()

    // function to handle when the user inputs(uploads) an image
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];    // grab the (one)file from that input
        previewFile(file);                    // call function to preview the file
    }
    const previewFile = (file) => {
      const reader = new FileReader();    // built-in JS API 
      reader.readAsDataURL(file);        // converts the img file to a String
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      }
    } 

    function handleSubmitForm() {
      console.log("submitting");
      if(!previewSource) return;
      addNewRecipe(previewSource);
    }

    // const handleIngredientInputChange = (event) => {
    //   let ingredientAdded = event.target.value; 
    //   return ingredientAdded;
    // }
    // function handleAddIngredient(val){
    //   let ingArray = [];
    //   console.log("adding an ingredient to the list");
    //   ingArray.push(ingredientAdded);
        
    // }
    function handleIngredientInputChange(ingredientArray){
      console.log(ingredientArray);
      setIngredients(ingredientArray)
    }  
      
  

    function addNewRecipe(base64EncodedImage) {
      let imageFile =  base64EncodedImage
      fetch("/add_recipe", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json",},
          body: JSON.stringify({ title, cuisine, servings, readyInMinutes, ingredients, instructions, imageFile}),
        }

      ) .then((response) => { 
          response.json().then((jsonResponse) => {
          const recipe = jsonResponse.recipeAdded;

          const {  recipe_id, title, cuisine, servings, readyInMinutes, ingredients, instructions, image } = recipe;

          props.addCard(recipe_id, title, cuisine, servings, readyInMinutes, ingredients, instructions, image);
        });
      });
    }

  return (
    <React.Fragment>
      <h2> Create a recipe </h2>
        <br />
      <label> Recipe Title </label>
      <input id="titleInput" value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
        <br />
      <label> Recipe Cuisine </label>
      <input id="cuisineInput" value={cuisine}
        onChange={(event) => setCuisine(event.target.value)}
      ></input>
        <br />
      <label> Servings Number </label>
      <input id="servingsInput" value={servings} type="number"
        onChange={(event) => setServings(event.target.value)}
      ></input>
        <br />
      <label> Minutes to be ready </label>
      <input id="readyInMinutes" value={readyInMinutes} type="number"
        onChange={(event) => setReadyInMinutes(event.target.value)}
      ></input>
        <br />

        
      <IngredientWidget inputChange={handleIngredientInputChange}/>
      
  
        
      <label> instructions </label>
      <textarea id="instructionsInput" value={instructions} type="text"
        onChange={(event) => setInstructions(event.target.value)}
      />
        <br />
      <label> image </label>
      <input  value={fileInput} type="file" name="file"
        onChange={handleFileInputChange}
      ></input>
        <br />
      <button onClick={handleSubmitForm}> Add my Recipe </button>

      {previewSource && (
                <img 
                  src={previewSource}
                  style={{ height : '200px' }}
                /> )
      }
    </React.Fragment>
  );
}

function RecipeDb(props){
  const {title, cuisine, servings, readyInMinutes, ingredients, instructions, image } = props;
  return(
    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text> {servings} - {readyInMinutes} - {ingredients}</Card.Text>
      <Button>{cuisine}</Button>
      </Card.Body>
    </Card> 

  )
}


function RecipeCardContainer() {
  const [cards, setCards] = React.useState([]);

  function addCard(recipe_id, title, cuisine, servings, readyInMinutes, ingredients, instructions, image) 
  {
    const newCard = { recipe_id, title, cuisine, servings, readyInMinutes,
                      ingredients, instructions, image}; 
    const currentCards = [...cards]; 
    setCards([...currentCards, newCard]);
  }

  React.useEffect(() => {
    fetch("/recipes_cards.json")
      .then((response) => response.json())
      .then((data) => setCards(data.cards));
  }, []);

  // if (!data) {
  //   return (
  //     <Spinner animation="border" role="status">
  //         <span className="sr-only">Loading...</span>
  //     </Spinner>
  //     )
  // }
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
        image={currentCard.image}
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

function IngredientWidget(props){
  const [numberOfInputs, setNumberOfInputs] = React.useState(1);
  const callFunction = () => {props.inputChange(allArray)}
  console.log(props);
  const inputElements = [];

  function handleInputIngredient(value){
    let allInputsArray = [];
    allInputsArray.push(value);
    return allInputsArray
  }
  let allArray = []
  for (let i=0; i < numberOfInputs; i++){
    inputElements.push(<input key={i} className="ingredientInputs" onChange={(event) => allArray.push(event.target.value)}></input>)
  }
  return (<div>
            <label> Needed Ingredients </label>
            
            {inputElements}
            
            <button onClick={() =>{setNumberOfInputs(numberOfInputs + 1)}}> + </button>
            <button onClick={() =>{setNumberOfInputs(numberOfInputs - 1)}} > - </button>
            <button onClick={callFunction}>Add Ingredient </button>
          </div>)
}