from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined
from model import connect_to_db
import crud
import requests
import parse_function
import model
app = Flask(__name__)
app.secret_key = "recipe"
app.jinja_env.undefined = StrictUndefined


app = Flask(__name__)
app.secret_key = "recipe"
app.jinja_env.undefined = StrictUndefined

API_KEY = os.environ['SPOON_KEY'] 



########################################################################
@app.route("/")
def login():
    return render_template("homepage.html")

########################################################################
    
@app.route("/search")
def search_recipes():
    return render_template("search.html")

@app.route("/results/<cuisine>")
def show_results(cuisine):
    

    url = 'https://api.spoonacular.com/recipes/complexSearch'
    params = {'apiKey': API_KEY,
               'fillIngredients': True,
                'addRecipeInformation': True,
                'instructionsRequired': True,
                'cuisine':cuisine,
                'number' : 10}
    
    response = requests.get(url, params)
    data = response.json()
    results = data['results']

    all_recipe_results = []

    for recipe in results:
        
        recipe_results = parse_api.parse_recipe_details(recipe)
        all_recipe_results.append(recipe_results)

    print(all_recipe_results)
    # return jsonify(all_recipe_results)

    return render_template("results.html", all_recipe_results=all_recipe_results)



if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)