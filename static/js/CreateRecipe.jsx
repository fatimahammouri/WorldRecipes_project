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
