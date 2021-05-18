"use strict";

// we'll start by creating App - Main componant 
function App(){
    return(
       <ReactRouterDOM.BrowserRouter>
           <nav>
               <ul>
                   <lil>
                        <ReactRouterDOM.Link to="/home">Home</ReactRouterDOM.Link>
                   </lil>
                   <lil>
                        <ReactRouterDOM.Link to="/recipes">Recipes from people</ReactRouterDOM.Link>
                   </lil>
                   <lil>
                        <ReactRouterDOM.Link to="/create_recipes">Create Recipes</ReactRouterDOM.Link>
                   </lil>
               </ul>
           </nav>
                <ReactRouterDOM.switch>
                    
                    <ReactRouterDOM.Route exact path="/home">
                        <Homepgae />
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/recipes">
                        <Recipes /> 
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/create_recipes">
                        <CreateRecipes />
                    </ReactRouterDOM.Route>

                </ReactRouterDOM.switch>
       </ReactRouterDOM.BrowserRouter> 
    );
}

// Render it on the div with id root
ReactDOM.render(<App />, document.querySelector("#root"));