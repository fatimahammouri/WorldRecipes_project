"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown,CardDeck,
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner, LinkButton, CardGroup} = ReactBootstrap;

function Recipe(props){
    const { title, servings, readyInMinutes,instructions, image, ingredients, sourceUrl } = props;
    return(
        
        <Container fluid style={{margin:'auto'}}>
            <Card  className="text-center" style={{ width:'20rem'}}>
            <Card.Img variant="top" src={image} style={{filter:'brightness(95%)'}} />
              
              <Card.Body >
                <Card.Title>{title}</Card.Title>
                <Card.Text >
                {/* <span >Serving Size { servings}</span>
                <span>Cook Time  {readyInMinutes}</span> */}
                <span class ="cardlink">
                  <a  href={sourceUrl}> RECIPE SOURCE </a>
                </span>
                </Card.Text>
              </Card.Body>
              
            </Card>
          </Container>
        
        
//     <Card style={{ width: '18rem' }}>
//     <Card.Img variant="top" src={image} />
//     <Card.Body>
//     <Card.Title>{title}</Card.Title>
//     <Card.Text> {servings} - {readyInMinutes}</Card.Text>
//     <Button><a href={sourceUrl}> RECIPE SOURCE </a></Button>
//     </Card.Body>
// </Card>
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
    <Row>
      <ul>
        {cuisineList.map(cuisine =>  <button onClick={()=> getCuisine(cuisine)}> {cuisine} </button>)}
      </ul>
     </Row>
      <div class="grid">
        {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
      </div>
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



