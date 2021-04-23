from flask import (Flask, render_template, request, flash, session,
                   redirect)

app = Flask(__name__) 
app.secret_key = "recipe"


@app.route("/")
def homepage():
    return render_template("homepage.html")


app.run(host='0.0.0.0', debug=True, port=5000)