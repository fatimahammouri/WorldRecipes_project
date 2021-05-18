"use strict";

//components
function Homepage(props){
    return(
        <div>
            <h1>Hello Recipes</h1>
        </div>    
    );
}

function Recipes(props){
    return(
        <div>
            Recipes from API will be here
        </div>
    );
}

function CreateRecipes() {
    return(
        <div>
            Create Recipe
        </div>
    );
    
  }

// we'll start by creating App - Main componant 
function App(props){
    return(
       <ReactRouterDOM.BrowserRouter>
           <nav>
               <ul>
                   <li>
                        <ReactRouterDOM.Link to="/home">Home</ReactRouterDOM.Link>
                   </li>
                   <li>
                        <ReactRouterDOM.Link to="/recipes">Recipes from people</ReactRouterDOM.Link>
                   </li>
                   <li>
                        <ReactRouterDOM.Link to="/create_recipes">Create Recipes</ReactRouterDOM.Link>
                   </li>
               </ul>
           </nav>
                <ReactRouterDOM.Switch>
                    
                    <ReactRouterDOM.Route exact path="/home">
                        <Homepage />
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/recipes">
                        <Recipes /> 
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/create_recipes">
                        <CreateRecipes />
                    </ReactRouterDOM.Route>

                </ReactRouterDOM.Switch>
       </ReactRouterDOM.BrowserRouter> 
    );
}

// Render it on the div with id root
ReactDOM.render(<App />, document.querySelector("#root"));