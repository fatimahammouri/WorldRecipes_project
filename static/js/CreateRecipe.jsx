// Recipe Card Component
function RecipeDb(props){
  const {title, cuisine, servings, readyInMinutes, ingredients, instructions, image } = props;
  

  return(
    <Card  className="card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text> {instructions}</Card.Text>
        <ListGroup>
        {/* {ingredients.map((ingredient) => <ListGroupItem>{ingredient}</ListGroupItem>)} */}
          <ListGroupItem> Servings Number:{servings} </ListGroupItem>
          <ListGroupItem>cooking Time:{readyInMinutes}</ListGroupItem>
          <ListGroupItem>ingredients:{ingredients}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card> 

  )
}


function IngredientWidget(props){
  const [numberOfInputs, setNumberOfInputs] = React.useState(1);
  
  const inputElements = [];
  for (let i=0; i < numberOfInputs; i++){
    inputElements.push(<input key={i} className="ingredientInputs forminput" 
    onChange={ (event) => setIngreidentList( { ...ingreidentList, [i]: event.target.value } )}
    ></input>)
  }

  return (
    <div>
      <label className="formlabel"> Needed Ingredients </label>   
        {inputElements}   
        <button className="formbtn" style={{width:"3em"}}
          onClick={() =>{setNumberOfInputs(numberOfInputs + 1)}}> + </button>
        <button className="formbtn" style={{width:"3em"}}
          onClick={() =>{setNumberOfInputs(numberOfInputs - 1)}} > - </button>    
    </div>)
}


function CreateRecipes(props){

  const [title, setTitle] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [servings, setServings] = React.useState(0);
  const [readyInMinutes, setReadyInMinutes] = React.useState(0);
  const [ingredients, setIngredients] = React.useState({});
  const [instructions, setInstructions] = React.useState("");
  const [fileInput, setFileInput] = React.useState();

  // Handling user Input change events
  // Handle image file
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];    
    updateFile(file);
    // console.log(file)                    
  }
  
  const updateFile = (file) => {
    const reader = new FileReader();    
    reader.readAsDataURL(file); 
    reader.onloadend = () => { setFileInput(reader.result); }
  } 


  return (
    <div className="form-container"> 
      <h1 style={{textAlign: 'center'}}>Create A Recipe</h1>

      <div className="recipes-form__section">
        <div className="recipes-form__row">
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

      <div className="recipes-form__section">
        <div className="recipes-form__row"> 
          <IngredientWidget />
        </div> 
      </div>

      <div className="recipes-form__section">
        <div className="recipes-form__row">
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
      </div>
       
      
    </div>
  );
}

