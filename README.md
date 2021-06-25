
# Recipe World
Recipe World is a Single page web app that allows users to search recipes based on cuisine or recipe category and  create recipes to share with others.
Navigation through routes is handled by React Router and Switch Components and useState hook is utilized to re-render the components when needed.
Spoonacular API is used to provide data for the requested recipes filtered by the user search criteria Also users can create a new recipe and  upload an image for it, data will be saved in the PostgreSQL database along with a generated URL for the image that Flask server gets from the Cloudinary API and the user will see the recipe added to all recipes created by other users.


## About Me
Hi and Welcome! 
After obtaining her BS in computer engineering, Fatima went on to work in quality assurance. There she worked hand-in-hand with web development teams and found herself extremely drawn to the efficiency and flexibility of problem solving, debugging, and testing along each step of coding. Software engineering and programming came naturally to her and she knew it was a perfect fit after every coding challenge she found herself more motivated and wanting to work harder.
Fatima Alhammouri || [Linkedin](https://www.linkedin.com/in/fatimaalhammouri/) || [Email](fatima.hammouri@gmail.com) 

---
## Technologies
* React
* JavaScript
* Python
* Flask
* PostgreSQL
* SQLAlchemy ORM
* HTML
* CSS
* React Router
* React Bootstrap
* Spoonacular
---
## Features

### Homepage

https://user-images.githubusercontent.com/43380670/123381086-1ebb8e80-d545-11eb-8df5-f003c6f0b20d.mov



### Search by Cuisines

https://user-images.githubusercontent.com/43380670/123382178-7d353c80-d546-11eb-83e0-ce7d9bb20032.mov



### Search by Categories
 
https://user-images.githubusercontent.com/43380670/123381688-e5375300-d545-11eb-9ff7-f595296f5bca.mov



### Create Recipe

https://user-images.githubusercontent.com/43380670/123383199-bd48ef00-d547-11eb-8a2e-2a5b27241e0e.mov

https://user-images.githubusercontent.com/43380670/123383242-cb970b00-d547-11eb-9f23-e0d9e913fb59.mov



Installation
To run Recipe World on your own machine:

Install PostgreSQL (Mac OSX)

Recipe World is styled using Mainly CSS, React Bootstrap, Google Fonts. CDNs are included in index.html

Clone or fork this repo:
```
$ https://github.com/fatimahammouri/WorldRecipes_project/
```
Create and activate a virtual environment inside your directory:
```
$ virtualenv env
$ source env/bin/activate
```
Install the dependencies:
```
$ pip install -r requirements.txt
```
Sign up to use the:

Spoonacular API
Cloudinary API
Save your API keys in a file called secrets.sh using this format:

export SPOON_KEY="YOUR KEY HERE"
export  CLOUDINARY_KEY="YOUR KEY HERE"
export  CLOUDINARY_SECRET="YOUR KEY HERE"
Source your keys from your secrets.sh file into your virtual environment:
```
$ source secrets.sh
```
Set up the database:
```
$ createdb recipe
$ python3 model.py
$ python3 seed_database.py
```
Run the app:
```
$ python3 server.py
```
Navigate to http://localhost:5000 to access RECIPE WORLD in your browser.







