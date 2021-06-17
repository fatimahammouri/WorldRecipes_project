function CreateRecipes(props){
  
  // image uploaded (user File Input)
  // const [fileInput, setFileInput] = React.useState();
  
  console.log(props)
  // function to handle when the user inputs(uploads) an image
  // const handleFileInputChange = (event) => {
  //     const file = event.target.files[0];    // grab the (one)file from that input
  //     updateFile(file);
  //     console.log(file)                    // call function to preview the file
  // }
  // const updateFile = (file) => {
  //   const reader = new FileReader();    // built-in JS API 
  //   reader.readAsDataURL(file);        // converts the img file to a String
  //   reader.onloadend = () => {
  //     setFileInput(reader.result);
  //   }
  // }  

  

  return (
    <div className="container"> 
        <h1 style={{textAlign: 'center'}}>Create A Recipe</h1>
      <div className="recipes-form__section">
        <div className="recipes-form__row">

          <label className= "formlabel"> Recipe Title </label>
            <input  id="titleInput"  className="forminput"></input>
          
          <label className= "formlabel"> Recipe Cuisine </label>
            <input  id="cuisineInput"  className="forminput"></input>
          
          <label className= "formlabel"> Servings Number </label>
            <input  id="servingsInput" 
                    type="number" min="0" className="forminput"></input>
          
          <label className= "formlabel"> Minutes to be ready </label>
            <input  id="readyInMinutes"  
                    type="number"  min="0" className="forminput"></input>

        </div>
      </div>

      <div className="recipes-form__section">
        <div className="recipes-form__row"> 

          <IngredientWidget />

          {/* <button className="formbtn"
                  onClick={updateIngredientsArray}> Add All Ingredients </button> */}

        </div> 
      </div>

      <div className="recipes-form__section">
        <div className="recipes-form__row">

          <label className= "formlabel"> instructions </label>
          <textarea id="instructionsInput"
                    type="text" className="forminput" />
      
       
          <label className= "formlabel"> image </label>
          <input  id="fileInput" type="file" className="forminput" style= {{backgroundColor:'#333'}}></input>

          <button className="formbtn" style={{width:'100%'}}
                  onClick={props.submitHandler}> Create My Recipe</button>

        </div>
      </div>
       
      
    </div>
  );
}

function RecipeDb(props){
  const {title, cuisine, servings, readyInMinutes, ingredients, instructions, image } = props;
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
        {/* {ingredients.map((ingredient) => <ListGroupItem>{ingredient}</ListGroupItem>)} */}
      </ListGroup>
      </Card.Body>
</Card> 

  )
}


function RecipeCardContainer() {
  const [cards, setCards] = React.useState([]);
  
  function handleSubmitForm() {
  // function to handle when the user inputs(uploads) an image
     // grab the (one)file from that input
    let fileInput = document.querySelector("#fileInput").files[0];
    if(!fileInput){
      alert("need to upload a file");
      return;
    }

    const reader = new FileReader(); // built-in JS API 
    reader.readAsDataURL(fileInput); // converts the img file to a String
    reader.onloadend = () => {
      fileInput = reader.result; 
  }
    
    addNewRecipe(fileInput);
  }
  function addNewRecipe(base64EncodedImage) {
    let imageFile =  base64EncodedImage;
    
    let inputList = document.querySelectorAll(".ingredientInputs");
    let title = document.querySelector("#titleInput").value;
    let cuisine = document.querySelector("#cuisineInput").value;
    let servings = document.querySelector("#servingsInput").value;
    let readyInMinutes = document.querySelector("#readyInMinutes").value;
    let instructions =document.querySelector("#instructionsInput").value;

    let ingredients = [];
    for (let input of inputList) {
      let value = input.value;
      ingredients.push(value);
    }
      

    fetch("/add_recipe", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ title, cuisine, servings, readyInMinutes, ingredients, instructions, imageFile}),
      })
      .then((response) => { 
        return response.json()
         
      })
      .then((jsonResponse) => {
        console.log(jsonResponse)
        let card = jsonResponse.recipeAdded;

        setCards([...cards, card])   
      });
          
  }

  function updateCards(){
    fetch("/recipes_cards.json")
      .then((response) => response.json())
      .then((data) => {console.log(data); return data})
      .then((data) => setCards(data.cards));
  }

  React.useEffect(() =>  updateCards(), []);

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
      <CreateRecipes submitHandler={handleSubmitForm}/>
      <h1 style={{textAlign: 'center'}}>Recipes cards</h1 >

      <div className="grid">
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
            
            <button className="formbtn" style={{width:"3em"}}
             onClick={() =>{setNumberOfInputs(numberOfInputs + 1)}}> + </button>

            <button className="formbtn" style={{width:"3em"}}
            onClick={() =>{setNumberOfInputs(numberOfInputs - 1)}} > - </button>
            
          </div>)
}