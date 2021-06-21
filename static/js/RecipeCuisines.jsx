"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown,CardDeck,
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner, LinkButton, CardGroup} = ReactBootstrap;

function Recipe(props){
    const { title, servings, readyInMinutes,instructions, image, ingredients, sourceUrl } = props;
    return(
        
        
            <Card  className="card" >
            <Card.Img variant="top" src={image} style={{filter:'brightness(95%)'}} />
              
              <Card.Body >
                <Card.Title>{title}</Card.Title>
                
                
                
              </Card.Body>
                  <Card.Body className ="cardlink">
                  <ListGroupItem className ="cardlink">  
                  <a  href={sourceUrl}> RECIPE SOURCE </a>
                  </ListGroupItem>
                  
                  </Card.Body>
              <Card.Footer className="text-muted">
                  Servings
                  <svg  style={{marginRight:"20px", marginLeft:"6px"}} width="24" height="24"  viewBox="0 0 122.88 122.88" ><g><path d="M61.44,20.1c11.41,0,21.75,4.63,29.23,12.11c7.48,7.48,12.11,17.81,12.11,29.23c0,11.41-4.63,21.75-12.11,29.23 c-7.48,7.48-17.81,12.11-29.23,12.11c-11.41,0-21.75-4.63-29.23-12.11C24.73,83.19,20.1,72.85,20.1,61.44 c0-11.41,4.63-21.75,12.11-29.23C39.69,24.73,50.03,20.1,61.44,20.1L61.44,20.1z M84.07,68.5c0.24-0.8,1.09-1.26,1.89-1.02 c0.8,0.24,1.26,1.09,1.02,1.89c-1.36,4.52-3.63,8.26-6.39,11.15c-3.02,3.16-6.65,5.28-10.34,6.24c-0.81,0.21-1.64-0.28-1.85-1.09 c-0.21-0.81,0.28-1.64,1.09-1.85c3.17-0.82,6.29-2.66,8.91-5.4C80.84,75.88,82.85,72.54,84.07,68.5L84.07,68.5L84.07,68.5z M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44c-11.12,11.12-26.48,18-43.44,18 c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18C29.11,6.88,44.47,0,61.44,0L61.44,0z M102.04,20.84C91.65,10.44,77.3,4.02,61.44,4.02c-15.86,0-30.21,6.43-40.6,16.82C10.44,31.23,4.02,45.58,4.02,61.44 c0,15.86,6.43,30.21,16.82,40.6c10.39,10.39,24.75,16.82,40.6,16.82c15.86,0,30.21-6.43,40.6-16.82 c10.39-10.39,16.82-24.75,16.82-40.6C118.86,45.58,112.44,31.23,102.04,20.84L102.04,20.84L102.04,20.84z M88.23,34.65 c-6.86-6.86-16.33-11.1-26.79-11.1c-10.46,0-19.94,4.24-26.79,11.1c-6.86,6.86-11.1,16.33-11.1,26.79 c0,10.46,4.24,19.94,11.1,26.79c6.86,6.86,16.33,11.1,26.79,11.1c10.46,0,19.94-4.24,26.79-11.1c6.86-6.86,11.1-16.33,11.1-26.79 C99.33,50.98,95.09,41.5,88.23,34.65L88.23,34.65z"/></g></svg>
                  {servings}
                 </Card.Footer>
              <Card.Footer className="text-muted">
                Cooking Time
                <svg  style={{marginRight:"20px", marginLeft:"6px"}} width="24" height="24" viewBox="0 0 24 24"><path d="M22 14c0 5.523-4.478 10-10 10s-10-4.477-10-10 4.478-10 10-10 10 4.477 10 10zm-2 0c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8 8-3.589 8-8zm-6-11.819v-2.181h-4v2.181c1.408-.238 2.562-.243 4 0zm6.679 3.554l1.321-1.321-1.414-1.414-1.407 1.407c.536.402 1.038.844 1.5 1.328zm-8.679 2.265v6h6c0-3.309-2.691-6-6-6z"/></svg>
                {readyInMinutes}
                </Card.Footer>
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

  // React.useEffect(()=>{
  //   getCuisine ("spanish")
  //   }, [])

  function getCuisine(cuisine){
    
    fetch(`/api/recipes/${cuisine}`)
    .then(response => response.json())
    .then(data => setCurrentRecipes(data))
  }
    
   return(
    <Container flex>
    
      <div className="big-image">
        <div className="overlay">
          <h2>Recipes from different Cuisines</h2>
          <p>Try a new Dish from your favourite cuisine</p>
        </div>
      </div>
      <Container flex>
      <ul className="buttonsList">
        
        {cuisineList.map(cuisine =>  <button className="btn"
                        onClick={()=> getCuisine(cuisine)}> {cuisine} </button>)}
      </ul>
      </Container>
      <div className="grid">
        {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
      </div>
      
      </Container>
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



