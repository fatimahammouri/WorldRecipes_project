import os 
import json

import crud 
import model
import server
import requests 
import pprint

os.system('dropdb recipes')
os.system('createdb recipes')


# from model.py get these functions
model.connect_to_db(server.app)
model.db.create_all()

####################################################################

# create test users
for n in range(5):
    email = f'user{n}@test.com'
    password = f'test{n}'
    username = f'user{n}'
    user = crud.create_user(email, password, username)   

########################################################################
# testing around the API responses
# API_KEY = os.environ['SPOON_KEY']
# url = 'https://api.spoonacular.com/recipes/random'

# params = {'apiKey': API_KEY,
#             'tags' : 'dessert,american',
#             'number' : 3}

# response = requests.get(url, params)
# data = response.json()

# for n in range(3):
#     cuisine_name = data['recipes'][n]['cuisines'][0]
#     print(cuisine_name)
#     recipe_id = data['recipes'][n]['id']
#     print (recipe_id)
#     instructions = data['recipes'][n]['instructions']
#     print(instructions)
#     image = data['recipes'][n]['image']
#     print(image)
    