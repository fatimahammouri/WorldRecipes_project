from flask import Flask, render_template

app = Flask(__name__) 




app.run(host='0.0.0.0', debug=True, port=5000)