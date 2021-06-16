from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined
from model import (connect_to_db, Recipe, Cuisine, db)
import crud
import requests
import os
import parse_api
import cloudinary.uploader

app = Flask(__name__)
app.secret_key = "recipe"
app.jinja_env.undefined = StrictUndefined

API_KEY = os.environ['SPOON_KEY'] 

CLOUDINARY_KEY = os.environ['CLOUDINARY_KEY']
CLOUDINARY_KEY_SECRET = os.environ['CLOUDINARY_SECRET']
########################################################################

@app.route('/')
@app.route('/<path>')
def route(path=''):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')


@app.route("/cuisines.json")
def get_cuisines():
    
    cuisine_list = crud.get_all_cuisines()
    # return  jsonify(cuisine_list)
    # print(cuisine_json)
    return {"name": cuisine_list}
    

@app.route("/api/recipes/<cuisine>")
def all_recipes(cuisine):
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    params = {'apiKey': API_KEY,
               'fillIngredients': True,
                'addRecipeInformation': True,
                'instructionsRequired': True,
                'cuisine' : cuisine,
                'number' : 55}
    
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
    image_file = request.get_json().get("imageFile")
    print("title",title)
    print("cuisine",cuisine)
    print("servings",servings)
    print("ready_in_minutes",ready_in_minutes)
    print("instructions",instructions)
    
    print("ingredients",ingredients) 
    
    if image_file:
        result = cloudinary.uploader.upload(image_file,
                    api_key=CLOUDINARY_KEY,
                    api_secret=CLOUDINARY_KEY_SECRET,
                    cloud_name='dplmlgxqq')

        image = result['secure_url']
    else:
        image = None


    new_recipe = Recipe(title=title, 
                        cuisine=cuisine,
                        servings=servings, 
                        ready_in_minutes=ready_in_minutes,
                        ingredients=ingredients,
                        instructions=instructions,
                        image=image)
    db.session.add(new_recipe)
    db.session.commit()
    db.session.refresh(new_recipe)
    return {
        "success": True,
        "recipeAdded": {
            "recipe_id" : new_recipe.recipe_id,
            "title": new_recipe.title,
            "cuisine": new_recipe.cuisine,
            "servings": new_recipe.servings,
            "readyInMinutes": new_recipe.ready_in_minutes,
            "ingredients": new_recipe.ingredients,
            "instructions": new_recipe.instructions,
            "image" : new_recipe.image
        },
    }       

@app.route("/recipes_cards.json")
def get_recipes_json():
    

    recipe_cards = Recipe.query.all()
    recipe_cards_list = []

    for r in recipe_cards:
        print(r.ingredients)
        recipe_cards_list.append(
            {
            "recipe_id" : r.recipe_id,
            "title": r.title,
            "cuisine": r.cuisine,
            "servings": r.servings,
            "readyInMinutes": r.ready_in_minutes,
            "ingredients": r.ingredients,
            "instructions": r.instructions,
            "image": r.image
            }
        )

    return jsonify({"cards": recipe_cards_list})

#################################################################################
@app.route("/api/recipe/<rtype>")
def type_recipes(rtype):
# https://api.spoonacular.com/recipes/complexSearch?apiKey=10908696a3b54d32b5925b490b9a43be&fillIngredients=true&addRecipeInformation=true&instructionsRequired=true&type='salad'&number=3
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    params = {'apiKey': API_KEY,
               'fillIngredients': False,
                'addRecipeInformation': True,
                'instructionsRequired': False,
                'type' : rtype,
                'number' : 55}


    response = requests.get(url, params)
    data = response.json()
    results = data["results"]
    
    recipes_by_type = []
    for r in range(len(results)):
        recipe = {}
        recipe["title"] = results[r]["title"]
        recipe["image"] = results[r]["image"]
        recipe["summary"] = results[r]["summary"]
        recipe["sourceUrl"] = results[r]["sourceUrl"]
        # print(title)
        recipes_by_type.append(recipe)
    # print(recipes_by_type)
    return jsonify(recipes_by_type)

#################################################################################

@app.route("/types.json")
def get_types():
    
    types_list = crud.get_all_types()
    
    return {"name": types_list}


if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)