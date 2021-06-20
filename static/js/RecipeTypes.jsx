
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
      <Container flex="true">
        <div className="big-image-type">
          <div className="overlay">
            <h2>Recipe Categories</h2>
            <p> Try a new recipe from your favourite category</p>
          </div>
        </div>
      <Container flex="true">
        <ul className="buttonsList">
          {typeList.map(rtype =>  <button className="btn" key={rtype}
                        onClick={()=> getType(rtype)}> {rtype} </button>)}
        </ul>
      </Container>
        <div className="grid">
          {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
        </div>
          
      </Container>
        )
  
  }