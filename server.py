from flask import (Flask, render_template, request, flash, session,
                   redirect)
from pprint import pformat, pprint
import os
import requests

from model import connect_to_db


app = Flask(__name__)
app.secret_key = "recipe"

API_KEY = os.environ['SPOON_KEY'] 

########################################################################
@app.route("/")
def homepage():
    return render_template("homepage.html")



if __name__ == '__main__':

    connect_to_db(app, echo=False)
    app.run(host='0.0.0.0', debug=True, port=5000)