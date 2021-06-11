
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
       <React.Fragment>
        <Container fluid>
          <Row>
            <ul>
              {typeList.map(rtype => <div className="typeBtns"> <button onClick={()=> getType(rtype)}> {rtype} </button></div>)}
            </ul>
          </Row>
          <Row>
            <div class="grid">
              {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
            </div>
          </Row>
       </Container>
       </React.Fragment> 
        )
  
  }