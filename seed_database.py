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
########################################################################

# seed ingredients
ingredients_list = ['water', 'sugar', 'olive oil', 'flour', 'salt',
                    'black pepper', 'rice', 'cooking oil', 'vinegar', 
                    'chicken', 'beef', 'lamp meat', 'milk', 'eggs', 
                    'fish', 'garlic', 'apple', 'orange', 'banana',
                    'red onions', 'raw nuts', 'cheese']

for ingredient in ingredients_list:
    ingredient = crud.create_ingredient(ingredient)

########################################################################

# seed Cuisines
cuisines_list = ['american', 'african', 'caribbean', 'chinese', 
                'european', 'cajun', 'french', 'greek', 'indian',
                'italian', 'mediterranean', 'mexican', 'thai']   