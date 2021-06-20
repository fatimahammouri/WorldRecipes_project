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
                <Card.Text >
                {/* <span >Serving Size { servings}</span>
                <span>Cook Time  {readyInMinutes}</span> */}
                <span class ="cardlink">
                  <a  href={sourceUrl}> RECIPE SOURCE </a>
                </span>
                </Card.Text>
              </Card.Body>
              
            </Card>
        
    )
}


function Buttons(props){
  const [Buttons, setButtons] = React.useState([]);
  const [currentRecipes, setCurrentRecipes] = React.useState([]);
  const [searchSelect, setSearchSelect] = React.useState([]);
  React.useEffect(()=>{
  fetch(`/${searchSelect}.json`)
  .then(response => response.json()) // js object ["", ""]
  .then ((jresponse) => setButtons(jresponse.name))
  }, [])

  

  function getRecipes(name){
    
    fetch(`/api/recipes/${name}`)
    .then(response => response.json())
    .then(data => setCurrentRecipes(data))
  }
    
   return(
    <Container flex>
    
      <div class="big-image">
        <div class="overlay">
          <h2>Recipes from different Cuisines</h2>
          <p>Try a new Dish from your favourite cuisine</p>
        </div>
      </div>
      <Container flex>
          <select> Search by :
          <option onClick={(event) => setSearchSelect(event.target.value)}
          value="cuisines">Cuisines</option>
            <option
             value="types">Types</option>
          </select>

      <ul className="buttonsList">
        
        {Buttons.map(name =>  <button className="btn"
                        onClick={()=> getRecipes(name)}> {name} </button>)}
      </ul>
      </Container>
      <div class="grid">
        {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
      </div>
      
      </Container>
      )

}


