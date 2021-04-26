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

@app.route("/login", methods=["GET", "POST"])
def process_login():
    """Process user login."""

    return render_template("login.html")

########################################################################

@app.route("/register", methods=["GET", "POST"])
def register_user():
    return render_template("register.html")

########################################################################

@app.route("/")
def login():
    return render_template("homepage.html")

########################################################################
    



# when creating end points, i will use
# any paremeters needed Ex:keyword = request.args.get('keyword', '')
# url = 'The URL for the end point'
# payload = {'apikey': API_KEY}


if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)