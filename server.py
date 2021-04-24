from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db
import crud
from jinja2 import StrictUndefined

import requests
from pprint import pformat, pprint
# import os

app = Flask(__name__)
app.secret_key = "recipe"
app.jinja_env.undefined = StrictUndefined

# API_KEY = os.environ['SPOON_KEY'] 

########################################################################

@app.route("/")
def login():
    return render_template("login.html")

########################################################################

@app.route('/register', methods=['POST'])
def register_user():
    """Create a new User"""
    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    if user:
        flash("Email already exist, Please try again.")
    else:
        crud.create_user(email, password)
        flash("You are signed up !")
    return redirect("/")



@app.route("/login", methods=["POST"])
def process_login():
    """Process user login."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered is incorrect.")
    else:
        # Log in user by storing the user's email in session
        session["user_email"] = user.email
        flash(f"Welcome back, {user.email}!")

    return redirect("/")

# when creating end points, i will use
# any paremeters needed Ex:keyword = request.args.get('keyword', '')
# url = 'The URL for the end point'
# payload = {'apikey': API_KEY}


if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)