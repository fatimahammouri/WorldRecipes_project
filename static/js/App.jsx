"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown, Image, 
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner} = ReactBootstrap;

//components
function Homepage(props){
    return(
        <div>
            <div className="welcome-text" >
                <h1>Recipe W<span>orld</span></h1>
                <a href="/recipes_by_cuisine">Explore recipes</a>   
            </div>  
             
                <Navbar expand="lg" bg="dark" variant="dark" fixed="bottom" className="footer">
                <Nav className="mr-auto">
                   
                   
                </Nav>

                <Nav>
                    <Nav.Link href="https://twitter.com/FatimaHammouri" 
                     rel="nofollow noopener" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" enableBackground="new 0 0 24 24" height="29" viewBox="0 0 24 24" width="29">
                    <path d="m21.534 7.113c.976-.693 1.797-1.558 2.466-2.554v-.001c-.893.391-1.843.651-2.835.777 1.02-.609 1.799-1.566 2.165-2.719-.951.567-2.001.967-3.12 1.191-.903-.962-2.19-1.557-3.594-1.557-2.724 0-4.917 2.211-4.917 4.921 0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147-.424.737-.674 1.58-.674 2.487 0 1.704.877 3.214 2.186 4.089-.791-.015-1.566-.245-2.223-.606v.054c0 2.391 1.705 4.377 3.942 4.835-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428-1.674 1.309-3.8 2.098-6.101 2.098-.403 0-.79-.018-1.177-.067 2.18 1.405 4.762 2.208 7.548 2.208 8.683 0 14.342-7.244 13.986-14.637z"/></svg>
                </Nav.Link>
                <Nav.Link href="https://github.com/fatimahammouri"  title="GitHub">
                    <svg aria-hidden="true" class="octicon octicon-mark-github" height="29" version="1.1" viewBox="0 0 16 16" width="29">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                    </path>
                    </svg>
                    
                </Nav.Link>
                <Nav.Link href="https://www.linkedin.com/in/fatimaalhammouri/">
                    <svg   version="1.1" id="Capa_1" x="0px" y="0px" width="29" height="29" viewBox="0 0 438.536 438.536" >
                    <path d="M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123   C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126   h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225   C438.532,59.576,430.49,40.204,414.41,24.123z M133.618,367.157H67.666V169.016h65.952V367.157z M127.626,132.332   c-6.851,6.567-15.893,9.851-27.124,9.851h-0.288c-10.848,0-19.648-3.284-26.407-9.851c-6.76-6.567-10.138-14.703-10.138-24.41   c0-9.897,3.476-18.083,10.421-24.556c6.95-6.471,15.942-9.708,26.98-9.708c11.039,0,19.89,3.237,26.553,9.708   c6.661,6.473,10.088,14.659,10.277,24.556C137.899,117.625,134.477,125.761,127.626,132.332z M370.873,367.157h-65.952v-105.92   c0-29.879-11.036-44.823-33.116-44.823c-8.374,0-15.42,2.331-21.128,6.995c-5.715,4.661-9.996,10.324-12.847,16.991   c-1.335,3.422-1.999,8.75-1.999,15.981v110.775h-65.952c0.571-119.529,0.571-185.579,0-198.142h65.952v27.974   c13.867-21.681,33.558-32.544,59.101-32.544c22.84,0,41.21,7.52,55.104,22.554c13.895,15.037,20.841,37.214,20.841,66.519v113.64   H370.873z"/>
                    </svg>
                </Nav.Link>
                </Nav>
            </Navbar>
        </div>
        
    );
}


function AboutMe(){
    return(
            
            <div class="clearfix">
                
                <img src="/static/images/me.jpeg" class="col-md-6 float-md-end mb-3 ms-md-3" alt="..."></img>
                <p>
                <label>Follow me on Twitter</label>
                <a href="https://twitter.com/FatimaHammouri" rel="nofollow noopener" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" enableBackground="new 0 0 24 24" height="40" viewBox="0 0 24 24" width="40">
                    <path d="m21.534 7.113c.976-.693 1.797-1.558 2.466-2.554v-.001c-.893.391-1.843.651-2.835.777 1.02-.609 1.799-1.566 2.165-2.719-.951.567-2.001.967-3.12 1.191-.903-.962-2.19-1.557-3.594-1.557-2.724 0-4.917 2.211-4.917 4.921 0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147-.424.737-.674 1.58-.674 2.487 0 1.704.877 3.214 2.186 4.089-.791-.015-1.566-.245-2.223-.606v.054c0 2.391 1.705 4.377 3.942 4.835-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428-1.674 1.309-3.8 2.098-6.101 2.098-.403 0-.79-.018-1.177-.067 2.18 1.405 4.762 2.208 7.548 2.208 8.683 0 14.342-7.244 13.986-14.637z"/></svg>
                </a>
                </p>
                <p>
                <label>Check my GitHub Account</label>
                <a href="https://github.com/fatimahammouri"  title="GitHub">
                    <svg aria-hidden="true" class="octicon octicon-mark-github" height="40" version="1.1" viewBox="0 0 16 16" width="40">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                </a>
                </p>

                <p>
                <label>Connect with me on LinkedIn</label>
                <a href="https://www.linkedin.com/in/fatimaalhammouri/">
                    <svg   version="1.1" id="Capa_1" x="0px" y="0px" width="40" height="40" viewBox="0 0 438.536 438.536" >
                    <path d="M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123   C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126   h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225   C438.532,59.576,430.49,40.204,414.41,24.123z M133.618,367.157H67.666V169.016h65.952V367.157z M127.626,132.332   c-6.851,6.567-15.893,9.851-27.124,9.851h-0.288c-10.848,0-19.648-3.284-26.407-9.851c-6.76-6.567-10.138-14.703-10.138-24.41   c0-9.897,3.476-18.083,10.421-24.556c6.95-6.471,15.942-9.708,26.98-9.708c11.039,0,19.89,3.237,26.553,9.708   c6.661,6.473,10.088,14.659,10.277,24.556C137.899,117.625,134.477,125.761,127.626,132.332z M370.873,367.157h-65.952v-105.92   c0-29.879-11.036-44.823-33.116-44.823c-8.374,0-15.42,2.331-21.128,6.995c-5.715,4.661-9.996,10.324-12.847,16.991   c-1.335,3.422-1.999,8.75-1.999,15.981v110.775h-65.952c0.571-119.529,0.571-185.579,0-198.142h65.952v27.974   c13.867-21.681,33.558-32.544,59.101-32.544c22.84,0,41.21,7.52,55.104,22.554c13.895,15.037,20.841,37.214,20.841,66.519v113.64   H370.873z"/></svg>
                </a>
                </p>
                <p>Hi this is me </p>
            </div>
         
               
       
    );
}

// we'll start by creating App - Main componant 
function App(props){
    return(
       <ReactRouterDOM.BrowserRouter>
             
                <nav className={"navbar navbar-default"}>
                <div className="container-fluid">
                    <ul className={"nav navbar-nav"}>
                        <li class="navLitem"><h1 id="logo"> Recipe W<span>orld</span></h1>
                        </li>
                        
                        <li className="navLitem">
                                <ReactRouterDOM.Link to="/home" className="link">Home</ReactRouterDOM.Link>
                        </li>
                        <li className="navLitem">
                                <ReactRouterDOM.Link to="/recipes_by_cuisine"  className="link">Recipes By Cuisine</ReactRouterDOM.Link>
                        </li>
                        
                        <li className="navLitem">
                                <ReactRouterDOM.Link to="/recipes_by_type" className="link">Recipes By Type</ReactRouterDOM.Link>
                        </li>

                        <li className="navLitem"> 
                                <ReactRouterDOM.Link to="/create_recipes" className="link">Create Recipes</ReactRouterDOM.Link>
                        </li>
                        <li className="navLitem">
                                <ReactRouterDOM.Link to="/about_me" className="link">About Me</ReactRouterDOM.Link>
                        </li>
                    </ul>
                </div>
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

                    <ReactRouterDOM.Route exact path="/about_me">
                        <AboutMe />
                    </ReactRouterDOM.Route>

                </ReactRouterDOM.Switch>
       </ReactRouterDOM.BrowserRouter> 
         
    );
}

// Render it on the div with id root
ReactDOM.render(<App />, document.querySelector("#root"));