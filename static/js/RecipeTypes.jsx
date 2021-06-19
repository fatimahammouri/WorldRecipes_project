
function Types(props){
    const [typeList, setTypeList] = React.useState([]);
    const [currentRecipes, setCurrentRecipes] = React.useState([]);
    React.useEffect(()=>{
    fetch("/types.json")
    .then(response => response.json()) // js object ["", ""]
    .then ((jresponse) => setTypeList(jresponse.name))
    }, [])
  
    function getType(rtype){
      
      fetch(`/api/recipe/${rtype}`)
      .then(response => response.json())
      .then(data => setCurrentRecipes(data))
    }
      
     return(
      <Container flex>
        <div class="big-image-type">
          <div class="overlay">
            <h2>Recipe Categories</h2>
            <p> Try a new recipe from your favourite category</p>
          </div>
        </div>
      <Container flex>
        <ul className="buttonsList">
          {typeList.map(rtype =>  <button className="btn"
                        onClick={()=> getType(rtype)}> {rtype} </button>)}
        </ul>
      </Container>
        <div class="grid">
          {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
        </div>
          
      </Container>
        )
  
  }