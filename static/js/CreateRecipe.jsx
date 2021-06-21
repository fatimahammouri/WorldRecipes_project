// Recipe Card Component
function RecipeDb(props){
  const {title, cuisine, servings, readyInMinutes, ingredients, instructions, image } = props;
  
  console.log(props)
  return(
    <Card  id="user-card" >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text> {instructions}</Card.Text>
        <ListGroup>
        {ingredients.map((ingredient) => <ListGroupItem>{ingredient}</ListGroupItem>)}
          <ListGroupItem> Servings {servings} </ListGroupItem>
          <ListGroupItem>cooking Time {readyInMinutes}</ListGroupItem>
          
        </ListGroup>
      </Card.Body>
    </Card> 

  )
}


function CreateRecipes(props){
  // console.log(" here in create recipes com", props.addCard)
  const [title, setTitle] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [servings, setServings] = React.useState(0);
  const [readyInMinutes, setReadyInMinutes] = React.useState(0);
  const [ingredients, setIngredients] = React.useState({});
  const [instructions, setInstructions] = React.useState("");
  const [fileInput, setFileInput] = React.useState();
  const [numberOfInputs, setNumberOfInputs] = React.useState(1);
  
  // Handling user Input change events
  // Handle image file
  // const handleIngredients = () => {
  //   setIngredients({...ingredients, [i]: ingredients})
  // }
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];    // grab the (one)file from that input
    setFileInput(file);
    // console.log(file)                    // call function to preview the file
  }
   
  
  function handleSubmitForm() {
    console.log("submitting");
    if(!fileInput) return;
    addNewRecipe();
  }

  
  function addNewRecipe() {
    
    
    let formData = new FormData();
    let ingredientsArray = Object.values(ingredients) 
    formData.append("title" , title) 
    formData.append("cuisine" , cuisine)
    formData.append("instructions" , instructions)
    formData.append("servings" , servings)
    formData.append("image" , fileInput)
    formData.append("ingredients" , JSON.stringify(ingredientsArray)) 
    formData.append("ready_in_minutes" , readyInMinutes)
    console.log(formData.get("title"))
    console.log(formData.get("cuisine"))
    console.log(formData.get("ingredients"))

    fetch("/add_recipe", 
      {
        method: "POST",
        
        body: formData,
      }

    ) .then((response) => { 
        console.log("res from server", response);
        response.json()
        
      .then((jsonResponse) => {
        const recipe = jsonResponse.recipeAdded;
        const recipe_id = recipe.recipe_id;
        const title = recipe.title;
        const cuisine = recipe.cuisine; 
        const instructions = recipe.instructions ;
        const servings = recipe.servings;
        const image = recipe.image;
        const ingredients = recipe.ingredients;
        const readyInMinutes = recipe.readyInMinutes;
        // console.log(title)
        // console.log(cuisine)
        // console.log(ingredients, typeof(ingredients))..[] string
        // console.log(readyInMinutes)
        // let ings = ingredients.replace(/[^a-zA-Z0-9 ,]/g, '').split(",")
        // console.log(ings)  
        props.addCard(recipe_id, title, cuisine, servings, readyInMinutes, ingredients, instructions, image);
    })
  });
  }

  const inputElements = [];
  for (let i=0; i < numberOfInputs; i++){
    inputElements.push(<input key={i} className="ingredientInputs forminput" 
    onChange={(event)=>setIngredients( { ...ingredients, [i]: event.target.value }) }
    ></input>)
  }
  
  return (
    <div className="form-container"> 
      <h1 style={{textAlign: 'center'}}>Create A Recipe</h1>

      
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
       
 
          <label className="formlabel"> Needed Ingredients </label>   
          {inputElements}   
          <button className="formbtn" style={{width:"3em"}}
            onClick={() =>{setNumberOfInputs(numberOfInputs + 1)}}> + </button>
          <button className="formbtn" style={{width:"3em"}}
            onClick={() =>{setNumberOfInputs(numberOfInputs - 1)}} > - </button>
       

      
          <label className= "formlabel"> instructions </label>
          <textarea id="instructionsInput" value={instructions}
                    type="text" className="forminput"
                    onChange={(event) => setInstructions(event.target.value)} />
      
       
          <label className= "formlabel"> image </label>
          <input  type="file" className="forminput" style= {{backgroundColor:'#333'}}
                  onChange={handleFileInputChange}></input>

          <button className="formbtn" style={{width:'100%'}}
                  onClick={handleSubmitForm}> Create My Recipe</button>

      
    </div>
  );
}

function RecipeCardContainer() {
  const [cards, setCards] = React.useState([]);
  function addCard(recipe_id, title, cuisine, servings, readyInMinutes, ingredients, instructions, image) 
  {
    
    const newCard = { 
            "recipe_id" : recipe_id,
            "title": title,
            "cuisine": cuisine,
            "servings": servings,
            "readyInMinutes": readyInMinutes,
            "ingredients": JSON.parse(ingredients),
            "instructions": instructions,
            "image": image
  };
  console.log("newCard==",newCard) 
    const currentCards = [...cards]; 
    setCards([...currentCards, newCard]);
  };
  // console.log(addCard)
  React.useEffect(() => {
    fetch("/recipes_cards.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCards(data.cards)});
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
        image={currentCard.image}
      />
    );
  }

  console.log(cards)
  return (
    <Container>
      <Row>
        <Col>
      <CreateRecipes addCard={addCard} />
      </Col>
      <Col>
      <div>
      <h2>Recipes cards</h2>
      <div  className= "grid" style={{marginTop:"3em"}}>{recipesCards}</div>
      </div>
      </Col>
      </Row>
    </Container>
  );
}
