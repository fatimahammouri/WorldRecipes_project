"""C R U D Operation Functions"""

from model import (db, Recipe, Cuisine, Type, connect_to_db)


"""Defining our Create, Read, Update, Delete Functions"""

def create_recipe(title, image, servings, ready_in_minutes, instructions, ingredients, cuisine_id):
    recipe = Recipe(title=title, 
                    image=image, 
                    servings=servings, 
                    ready_in_minutes=ready_in_minutes,
                    instructions=instructions,
                    ingredients=ingredients, 
                    cuisine_id=cuisine_id)
    db.session.add(recipe)
    db.session.commit()

    return recipe

#####################################################################

def create_cuisine(cuisine_name):

    cuisine = Cuisine(cuisine_name=cuisine_name) 
    db.session.add(cuisine)
    db.session.commit()

    return cuisine

#####################################################################

def create_type(type_name):
    rtype = Type(type_name=type_name)

    db.session.add(rtype)
    db.session.commit()
    return rtype

#####################################################################

def get_all_cuisines():

    cuisine_list = []

    for cuisine in Cuisine.query.all():
        cuisine_list.append(cuisine.cuisine_name)
    return cuisine_list

#####################################################################

def get_all_recipes():
    return Recipe.query.all()

#####################################################################
def get_cuisine_id_from_name(cuisine_name):
    cuisine = Cuisine.query.filter(Cuisine.cuisine_name == cuisine_name).first()
    return cuisine.cuisine_id

#####################################################################

def get_all_types():
    
    types_list = []

    for rtype in Type.query.all():
        types_list.append(rtype.type_name)
    
    return types_list



if __name__== '__main__':
    from server import app
    connect_to_db(app)

# def create_user(email, password, username):

#     user = User(email=email, password=password, username=username)
#     db.session.add(user)
#     db.session.commit()

#     return user

# #####################################################################

# def get_user_by_email(email):
    
#     return User.query.filter(User.email == email).first()

# #####################################################################