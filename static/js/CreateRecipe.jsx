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
        updateFile(file);
        console.log(file)                    // call function to preview the file
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
      console.log("allIngredientsArray (from user inputs)",allIngredientsArray)
      setIngredients([...ingredients, allIngredientsArray])
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
          console.log(typeof(ingredients))
          
          let ings = ingredients.replace(/[^a-zA-Z0-9 ,]/g, '').split(",")
          
          console.log("this is the ings",ings)
          props.addCard(recipe_id, title, cuisine, servings, readyInMinutes, ings, instructions, image);
        });
      });
    }

    

  return (
    <div className="container"> 
        <h1 style={{textAlign: 'center'}}>Create A Recipe</h1>
      <div class="recipes-form__section">
        <div class="recipes-form__row">

          <label className= "formlabel"> Recipe Title </label>
            <input  id="titleInput" value={title} className="forminput"
                    onChange={(event) => setTitle(event.target.value)}></input>
          
          <label className= "formlabel"> Recipe Cuisine </label>
            <input  id="cuisineInput" value={cuisine} className="forminput"
                    onChange={(event) => setCuisine(event.target.value)}></input>
          
          <label className= "formlabel"> Servings Number </label>
            <input  id="servingsInput" value={servings} 
                    type="number" min="0" className="forminput"
                    onChange={(event) => setServings(event.target.value)}></input>
          
          <label className= "formlabel"> Minutes to be ready </label>
            <input  id="readyInMinutes" value={readyInMinutes} 
                    type="number"  min="0" className="forminput"
                    onChange={(event) => setReadyInMinutes(event.target.value)}></input>

        </div>
      </div>

      <div class="recipes-form__section">
        <div class="recipes-form__row"> 

          <IngredientWidget />

          <button className="formbtn"
                  onClick={updateIngredientsArray}> Add All Ingredients </button>

        </div> 
      </div>

      <div class="recipes-form__section">
        <div class="recipes-form__row">

          <label className= "formlabel"> instructions </label>
          <textarea id="instructionsInput" value={instructions}
                    type="text" className="forminput"
                    onChange={(event) => setInstructions(event.target.value)} />
      
       
          <label className= "formlabel"> image </label>
          <input  type="file" className="forminput" style= {{backgroundColor:'#333'}}
                  onChange={handleFileInputChange}></input>

          <button className="formbtn"
                  onClick={handleSubmitForm}> Create My Recipe</button>

        </div>
      </div>
       
      
    </div>
  );
}

function RecipeDb(props){
  const {title, cuisine, servings, readyInMinutes, ingredients=[], instructions, image } = props;
  console.log(title, 'TITLE')
  console.log(cuisine, 'CUISINE')
  console.log(ingredients)

  return(
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={image} />
  <Card.Body>
    <Card.Title>{title}</Card.Title>
      <Card.Text> {servings} - {readyInMinutes} - {ingredients}</Card.Text>
      <ListGroup>
        {ingredients.map((ingredient) => <ListGroupItem>{ingredient}</ListGroupItem>)}
      </ListGroup>
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
      .then((data) => {console.log(data); return data})
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
  console.log(cards)
  return (
    <React.Fragment>
      <CreateRecipes addCard={addCard} />
      <h1 style={{textAlign: 'center'}}>Recipes cards</h1 >
      
      <div class="grid">
        {recipesCards}
      </div>
    </React.Fragment>
  );
}

function IngredientWidget(props){
  const [numberOfInputs, setNumberOfInputs] = React.useState(1);
  

  const inputElements = [];

  for (let i=0; i < numberOfInputs; i++){
    inputElements.push(<input key={i} className="ingredientInputs forminput" ></input>)
  }
  return (<div>
            <label className="formlabel"> Needed Ingredients </label>
            
            {inputElements}
            
            <button class="formbtn" style={{width:"3em"}}
             onClick={() =>{setNumberOfInputs(numberOfInputs + 1)}}> + </button>

            <button class="formbtn" style={{width:"3em"}}
            onClick={() =>{setNumberOfInputs(numberOfInputs - 1)}} > - </button>
            
          </div>)
}