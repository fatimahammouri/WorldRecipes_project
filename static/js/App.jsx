"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown,
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner} = ReactBootstrap;

//components
function Homepage(props){
    return(
        <div>
            <h1>Home Page Logo</h1>
            
        </div>    
    );
}



// function CreateRecipes() {
//     return(
//         <div>
//             Create Recipe
//         </div>
//     );
    
//   }

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
                        <ReactRouterDOM.Link to="/recipes_by_cuisine">Recipes By Cuisines</ReactRouterDOM.Link>
                   </li>
                   <li>
                        <ReactRouterDOM.Link to="/create_recipes">Create Recipes</ReactRouterDOM.Link>
                   </li>
                   <li>
                        <ReactRouterDOM.Link to="/recipes_by_type">Search recipes by Type</ReactRouterDOM.Link>
                   </li>
               </ul>
           </nav>
                <ReactRouterDOM.Switch>
                    
                    <ReactRouterDOM.Route exact path="/home">
                        <Homepage />
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/recipes_by_cuisine">
                        <CuisineList />
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/create_recipes">
                        <RecipeCardContainer />
                    </ReactRouterDOM.Route>

                    <ReactRouterDOM.Route exact path="/recipes_by_type">
                        <Types />
                    </ReactRouterDOM.Route>

                </ReactRouterDOM.Switch>
       </ReactRouterDOM.BrowserRouter> 
    );
}

// Render it on the div with id root
ReactDOM.render(<App />, document.querySelector("#root"));