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
cuisines_list = ['american', 'african', 'caribbean', 'chinese', 
                'european', 'cajun', 'french', 'greek', 'indian',
                'italian', 'mediterranean', 'mexican', 'thai']

for cuisine in cuisines_list:
    cuisine = crud.create_cuisine(cuisine)  

# ####################################################################

# #create test users
# for n in range(5):
#     email = f'user{n}@test.com'
#     password = f'test{n}'
#     username = f'user{n}'
#     user = crud.create_user(email, password, username)   