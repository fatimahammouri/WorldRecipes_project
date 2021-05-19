from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined
from model import (connect_to_db, Recipe, Cuisine, db)
import crud
import requests
import os
import parse_api


app = Flask(__name__)
app.secret_key = "recipe"
app.jinja_env.undefined = StrictUndefined

API_KEY = os.environ['SPOON_KEY'] 

########################################################################

@app.route('/')
@app.route('/<path>')
def route(path=''):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')



@app.route("/api/recipes")
def all_recipes():
    
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    params = {'apiKey': API_KEY,
               'fillIngredients': True,
                'addRecipeInformation': True,
                'instructionsRequired': True,
                
                'number' : 10}
    
    response = requests.get(url, params)
    data = response.json()
    results = data['results']

    all_recipe_results = []

    for recipe in results:
        
        recipe_results = parse_api.parse_recipe_details(recipe)
        all_recipe_results.append(recipe_results)

    # print(all_recipe_results)
    return jsonify(all_recipe_results)

@app.route("/add_recipe" , methods=["POST"])
def add_recipe():
    # data = request.get_json()
    # title = data.title etc etc........ 
    title = request.get_json().get("title")
    cuisine = request.get_json().get("cuisine")
    servings = request.get_json().get("servings")
    ready_in_minutes = request.get_json().get("readyInMinutes")
    ingredients = request.get_json().get("ingredients")
    instructions = request.get_json().get("instructions")

    new_recipe = Recipe(title=title, 
                        cuisine=cuisine,
                        servings=servings, 
                        ready_in_minutes=ready_in_minutes,
                        ingredients=ingredients,
                        instructions=instructions)
    db.session.add(new_recipe)
    db.session.commit()
    db.session.refresh(new_recipe)
    return {
        "success": True,
        "cardAdded": {
            "recipe_id" : new_recipe.recipe_id,
            "title": new_recipe.title,
            "cuisine": new_recipe.cuisine,
            "servings": new_recipe.servings,
            "ready_in_minutes": new_recipe.ready_in_minutes,
            "ingredients": new_recipe.ingredients,
            "instructions": new_recipe.instructions
        },
    }       




if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)