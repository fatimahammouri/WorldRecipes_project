"use strict";

const Img = ReactBootstrap.Image;
const {Container, Button, ButtonGroup, Navbar, Form, NavDropdown,
Nav, Media, Row, Col, Modal, Alert, Toast, Card, Spinner} = ReactBootstrap;

//components
function Homepage(props){
    return(
        <Container fluid>
        <Row>
        <div>
            <h1>Home Page Logo</h1>
            
        </div> 
        </Row>
        </Container>  
    );
}




// we'll start by creating App - Main componant 
function App(props){
    return(
       <ReactRouterDOM.BrowserRouter>
        <Container fluid>
            
            <Row>
           <nav>
               
           <a href="https://icons8.com/icon/xkgGMlnROY8E/dinner"></a>
           
               <ul className="navigation">
                   <img id="logoImg"
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAABmJLR0QA/wD/AP+gvaeTAAAHfUlEQVRoge2ZfVATZx7Hf0/MEkgCbUElAQFHaomicbiWzlHP0On4UlvFYqVT5/7w5jp6zk1vfLn+YVuvY8eZOt6dh9I/7kTbKXWqd7VWoVVGBCvgS4kIJAEEo5IEIQEUhLzsbhay/WNtJm42YTfZwDnj568nz++X3e93n9d9FhGEF55kJNMtIFqeGphunhqYbp4amG4EG8Bx/PTp7/V6fSzURIBUUDaO43v2fGI2mxFCpaWHMjMzYySLPwJagKbpsrKDZrMZACQSiVQqzHyMEGDg+vXrTU1NAIAQev/9v6SlpcVMlQAEGKiqqmQKxcXrCwtfjY0ewfA14PF4uru7AADDsOLi9bGUJAy+BoaGhiYmJgBg7ty5CoUilpKEwXcgUhTFFDAsjk8+QRBGo9HhsCOEVCq1VquVyWQRagwLXwMpKclMobe31+fzSSQhm46m6crKM6dOfed2u/2VCoViw4aSoqJ1CKFo5AbDtws991xyeno6ADidY1euXAmVRtP0wYP/+vrrikD1AOB2uysqvjp0qJSm6WjkBjNj9+6/Bf4mSbKs7GB1dXVu7iJWXydJ0mg0AEBHR3tBwStKpTL4cpWVZ374oYopq1SqgoJXsrOzPR63y+UCAKvVKpfLc3I0IhpArFfKxsbG0tIDAJCZmblv3/6EhIRAAzt3brfb7ZxRACAIYvPm95hnv3z5is2bt2AYBgAURZWXH66rqwUAhUJx9OiXIo4HdhfSaDRyuRwAbDabf+JnkMlku3Z9FCoKACaTiVGvVqv96gEAw7AtW/6UmpoKAG6322QyiqWew8CsWbO2bv0zUz537iwzdfrJyMgIE+3v72MKWu0Sv3oGDMO02iW/pvWLJB6AcxAvXbp0zpw5AOB0Os3mW4KiDD6fL8wtxZ2IOAwghBYuzGXKDoeDfzQtLZ0pmExG/7rB4PV6DYa2X9PE3ERxT6NxcY9WK5aO8FGtVstMXA6Ho7z8sD/q9XrLyw8PDg4CgFKpXLxYK5J4gFALmcViYQopKSn8ozKZbMOGkoqKrwCgrq62vd3E9HuDoY1RDwAlJe/4/YsChwGbzdbZ2QEAUqlUo1kgKFpUtK6n525DQwMADAwMXLhQExjV6QrXrFkronoINkCSZGnpAWYUFhQUMJMmzygAIIS2bdsxb172yZPfBi7GSqWypOSdNWvWir6VYBvQ6/VWqxUAEhISNm78vaAoA0KoqGjdqlWvM5s5AFCr1VrtEnF7jh+2AY1Gk5T0DI57tm3boVKpBEUDkclk+fn5Iovlgr2VAACSJL1eb2JiIucfwkenHg4DTxYinyyQ4+Mt9ntt9v7OwYEht2uMJAAgSRY/W6FcOFu1RK3+jXqOTNTjDNFaoG9stPJm+/nb3U6SDJOWJItfNT/nrQWL1IlJotxXBAMukjxhav2uw0g9vrcLg1QiKdLk/iEvXxn1vjpaA/p7tv0NP40Qngj+m5wg36V77aX0jGgERG7AR9NHmn/+1tQWzTuiBKF3F+f98cWXJZEucBEaoCYmPmuore+5G9ldWSzNmru7cEVkgzsSA26v98Oas+2D7J02AMixuDc1C9Yv0iKEdlX/aBkZ5nlNrSpt34o3Eh5/DeKDYAOUb+LjC9XNfb3Bodey52//nS5F/ugo4D9NV4+1NPO/cp46fd/KN+NmzBCkR9j3AR9Nf3qxJlh9PIbtXbl678rVfvUDLmf93TuCLt5q7/usvtYn8NxFWAt8cUP/jeEGqzJVmfj3N9Y+nzKT+dk/Nvpls77WfIvy8Z1VA9mUl78p7yX++QLGzRWr5XiQ+tlK5efr1qcnPQMANMD/DK1H9NeI8XH+l2VxrK35hZRZBZlZPPP5dqEHHs8/Lv/Eat0kWXzZ2kfqcYr6pKb686uN0agHAB9N72+8OIzzXVj4Gvjn5UvMxiYQ3bzsjGefBQCcov56tvLiHTN/oWEYI4kDl+t5JvMycOHOraZ71uD6lr57w7hnlCA+OFdlsIt52nOt11J35zafzMkHsYfybjp14oGHu02lEgkCFNl4Dc9MuaLi7Y2TrgyTt8BxQ2so9QAw7vPFQj0A3Pe4/2tqnTRtEgNjJH76pkkkSYI52WEcJfDwOZMYOGFswx8/vfptZtb597b+u7gkXviyLxSCok52THISHM6Ay+ut6uoIrJFKJDuXvaqMi9Oq1LmzU0XQOBlnOts9VLhRGs7AeXMX6/GvzlnAzPqjBN45OCCKxPB4KG/Nbe4jZIZwBn7s7mTVrJifwxS+aWvBuY5NYwGrF7AIaeDW/SHrwxFW5c82CwB0Dw2eMhlEEccHy8jw7Qf3Q0VD7oUuWTj2ksfbWs523XSShNA9Y5TUW+76N4ssQrbANZuFs36UwKdYPQBctfWECnEbGMY9tqD+M41YRoZDnRtwGzA67FP9kMNCA5iCvhUxcBvg/y47ZfSEkMRtwDr6f2fA+pBbkpSm6YaG+uHhx8KWro54l3NKhPHFMvDg9ENXYE1ycrJOVyitr79UVnYo+A/xU6WMJw8Bjl3nOOOQiP7NZypBCEl1ukKEEPPh6MkiKytr2TLdL2eNR6tgxs1oAAAAAElFTkSuQmCC"/>
                   <li class="navLitem">
                        <ReactRouterDOM.Link to="/home" className="link">Home</ReactRouterDOM.Link>
                   </li>
                   <li class="navLitem">
                        <ReactRouterDOM.Link to="/recipes_by_cuisine"  className="link">Recipes By Cuisines</ReactRouterDOM.Link>
                   </li>
                   <li class="navLitem"> 
                        <ReactRouterDOM.Link to="/create_recipes" className="link">Create Recipes</ReactRouterDOM.Link>
                   </li>
                   <li class="navLitem">
                        <ReactRouterDOM.Link to="/recipes_by_type" className="link">Search recipes by Type</ReactRouterDOM.Link>
                   </li>
               </ul>
           </nav>
           </Row>
        </Container>
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