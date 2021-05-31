
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
       <ul>
         {typeList.map(rtype =>  <button onClick={()=> getType(rtype)}> {rtype} </button>)}
       </ul> 
       {currentRecipes.map(recipe =>  <Recipe {...recipe}/>  )}
       </React.Fragment> 
        )
  
  }