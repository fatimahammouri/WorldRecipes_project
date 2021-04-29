import os 
import json

import crud 
import model
import server

os.system('dropdb recipes')
os.system('createdb recipes')


# from model.py get these functions
model.connect_to_db(server.app)
model.db.create_all()