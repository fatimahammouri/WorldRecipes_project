import os 
import json

import crud 
import model
import server
import requests 
import pprint

os.system('dropdb recipe')
os.system('createdb recipe')


# from model.py get these functions
model.connect_to_db(server.app)
model.db.create_all()

########################################################################

# seed Cuisines
cuisines_list = [ 'italian', 'mexican', 'american', 'spanish','chinese', 
                    'greek', 'indian', 'thai', 'japanese', 'korean',
                     'latin american', 'middle eastern', 'vietnamese']

for cuisine in cuisines_list:
    cuisine = crud.create_cuisine(cuisine)  

# ####################################################################
# seeding types 

types_list = ['main course', 'appetizer', 'dessert',
                'salad', 'side dish', 'drink',  
                'breakfast','snack', 'soup']

for rtype in types_list:
    rtype = crud.create_type(rtype)  