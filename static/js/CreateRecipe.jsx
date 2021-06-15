function CreateRecipes(props){
    const [title, setTitle] = React.useState("");
    const [cuisine, setCuisine] = React.useState("");
    const [servings, setServings] = React.useState(0);
    const [readyInMinutes, setReadyInMinutes] = React.useState(0);
    const [ingredients, setIngredients] = React.useState([]);
    const [instructions, setInstructions] = React.useState("");
    // image uploaded (user File Input)
    const [fileInput, setFileInput] = React.useState();
    

    // function to handle when the user inputs(uploads) an image
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];    // grab the (one)file from that input
        updateFile(file);                    // call function to preview the file
    }
    const updateFile = (file) => {
      const reader = new FileReader();    // built-in JS API 
      reader.readAsDataURL(file);        // converts the img file to a String
      reader.onloadend = () => {
        setFileInput(reader.result);
      }
    }  

    function updateIngredientsArray(){
      let allIngredientsArray=[]
      let inputList = document.querySelectorAll(".ingredientInputs");

      for (let input of inputList) {
        let value = input.value;
        allIngredientsArray.push(value)
      }

      console.log(allIngredientsArray)
      setIngredients(allIngredientsArray)
    }
      


    function handleSubmitForm() {
      console.log("submitting");
      if(!fileInput) return;
      addNewRecipe(fileInput);
    }
    

    function addNewRecipe(base64EncodedImage, allIngredientsArray) {
      let imageFile =  base64EncodedImage

      // let allIngredientsArray=[]
      // let inputList = document.querySelectorAll(".ingredientInputs");

      // for (let input of inputList) {
      //   let value = input.value;
      //   allIngredientsArray.push(value)
      // }
      
      // setIngredients(allIngredientsArray)
      console.log("setTitle value:",title) 
      console.log("setCuisine value:",cuisine) 
      console.log("setServings value:",servings)
      console.log("setIngredient value:",ingredients)  

      fetch("/add_recipe", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json",},
          body: JSON.stringify({ title, cuisine, servings, readyInMinutes, ingredients, instructions, imageFile}),
        }

      ) .then((response) => { 
          response.json()
          // console.log(response.json)
        .then((jsonResponse) => {
          const recipe = jsonResponse.recipeAdded;

          const {  recipe_id, title, cuisine, servings, readyInMinutes, ingredients, instructions, image } = recipe;
          console.log(recipe.title)
          console.log(typeof ingredients)
          
          let ings = ingredients.replace(/[^a-zA-Z0-9 ,]/g, '').split(",")
          console.log(ings)
          props.addCard(recipe_id, title, cuisine, servings, readyInMinutes, ings, instructions, image);
        });
      });
    }

  return (
    <React.Fragment>

      <h2> Create a recipe </h2>
        
      <label> Recipe Title </label>
        <input id="titleInput" value={title}
        onChange={(event) => setTitle(event.target.value)}></input>
       
      <label> Recipe Cuisine </label>
        <input id="cuisineInput" value={cuisine}
        onChange={(event) => setCuisine(event.target.value)}></input>
       
      <label> Servings Number </label>
        <input id="servingsInput" value={servings} type="number"
        onChange={(event) => setServings(event.target.value)}></input>
       
      <label> Minutes to be ready </label>
        <input id="readyInMinutes" value={readyInMinutes} type="number"
        onChange={(event) => setReadyInMinutes(event.target.value)}></input>
         
      <IngredientWidget />
      <button onClick={updateIngredientsArray}>Add All Ingredients</button>

      <label> instructions </label>
        <textarea id="instructionsInput" value={instructions} type="text"
        onChange={(event) => setInstructions(event.target.value)} />
       
      <label> image </label>
        <input  type="file" 
        onChange={handleFileInputChange}></input>
        
      <button onClick={handleSubmitForm}> Add my Recipe </button>
  
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

  function addCard(recipe_id, title, cuisine, servings, readyInMinutes, ings, instructions, image) 
  {
    const newCard = { recipe_id, title, cuisine, servings, readyInMinutes,
      ings, instructions, image}; 
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
        ingredients={currentCard.ings}
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
  // const callFunction = () => {
  //   let allArray=[]
  //   inputList = document.querySelectorAll(".ingredientInputs");
  //   for (let i of inputList) {
  //     let value = i.value;
  //     allArray.push(value)
  //   }
  //   props.inputChange(allArray)
  // }
  // console.log(props);

  const inputElements = [];

  for (let i=0; i < numberOfInputs; i++){
    inputElements.push(<input key={i} className="ingredientInputs" ></input>)
  }
  return (<div>
            <label> Needed Ingredients </label>
            
            {inputElements}
            
            <button onClick={() =>{setNumberOfInputs(numberOfInputs + 1)}}> + </button>
            <button onClick={() =>{setNumberOfInputs(numberOfInputs - 1)}} > - </button>
            
          </div>)
}