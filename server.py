from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import crud
from jinja2 import StrictUndefined

import requests
from pprint import pformat, pprint
import os

import parse_api


app = Flask(__name__)
app.secret_key = "recipe"
app.jinja_env.undefined = StrictUndefined

API_KEY = os.environ['SPOON_KEY'] 

@app.route("/login", methods=["POST"])
def process_login():
    """Process user login."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    print(user)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")
    else:
        # Log in user by storing the user's email in session
        # session["email"] = user.email
        flash(f"Welcome back, {user.email}!")
        return redirect("/search")

    return redirect("/")

########################################################################

@app.route("/register", methods=["GET"])
def register_user():
    """Render Register Page"""

    return render_template("register.html")

########################################################################

@app.route("/user", methods=["POST"])
def create_user():
    """Create a new user"""
    email = request.form["email"]
    password = request.form["password"]
    username = request.form["username"]

    user = crud.get_user_by_email(email)
    print(user)
    if user:
        flash("This Email already exist. Try again.")
    else:
        crud.create_user(email, password, username)
        flash("Account created! Please log in.")
        return redirect("/")
    return redirect("/register")

########################################################################
@app.route("/")
def login():
    return render_template("login.html")

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
    return jsonify(all_recipe_results)

    # return render_template("results.html", all_recipe_results=all_recipe_results)



if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)