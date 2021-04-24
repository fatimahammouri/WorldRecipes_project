from flask import (Flask, render_template, request, flash, session,
                   redirect)
from pprint import pformat, pprint
import os
import requests

from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "recipe"

# API_KEY = os.environ['SPOON_KEY'] 

########################################################################
@app.route("/")
def homepage():
    return render_template("homepage.html")

# @app.route("/login", methods=['POST'])
# def handle_login():
#     username = request.form['username']
#     password = request.form['password']

@app.route('/register', methods=['POST'])
def register_user():
    email = request.form['email']
    password = request.form['password']

    user = get_user_by_email(email)
    if user:
        return 'A user already exists with that email.'
    else:
        create_user(email, password)

        return redirect('/')

# when creating end points, i will use
# any paremeters needed Ex:keyword = request.args.get('keyword', '')
# url = 'The URL for the end point'
# payload = {'apikey': API_KEY}


if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)