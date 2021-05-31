"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown,
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner, LinkButton} = ReactBootstrap;

function Recipe(props){
    const { title, servings, readyInMinutes,instructions, image, ingredients, sourceUrl } = props;
    return(
   
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


function CuisineList(props){
  const [cuisineList, setCuisineList] = React.useState([]);
  const [currentRecipes, setCurrentRecipes] = React.useState([]);
  React.useEffect(()=>{
  fetch("/cuisines.json")
  .then(response => response.json()) // js object ["", ""]
  .then ((jresponse) => setCuisineList(jresponse.name))
  }, [])

  function getCuisine(cuisine){
    
    fetch(`/api/recipes/${cuisine}`)
    .then(response => response.json())
    .then(data => setCurrentRecipes(data))
  }
    
   return(
     <React.Fragment>
     <ul>
       {cuisineList.map(cuisine =>  <button onClick={()=> getCuisine(cuisine)}> {cuisine} </button>)}
     </ul> 
     {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
     </React.Fragment> 
      )

}


function Recipes(props){
    const [recipeData, setRecipeData] = React.useState(null)
    React.useEffect(() => {
      fetch(`/api/recipes/${rtype}`)
        .then(response => response.json())
        .then(recipeData => setRecipeData(recipeData))
    }, [])

    if (!recipeData) {
      return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
        )
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



