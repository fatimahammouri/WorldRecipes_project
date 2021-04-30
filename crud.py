"""C R U D Operation Functions"""

from model import (db, User, Recipe, Cuisine, Ingredient,
                Ingredient_recipe, recipe_cuisine, connect_to_db)


"""Defining our Create, Read, Update, Delete Functions"""

def create_user(email, password, username):

    user = User(email=email, password=password, username=username)
    db.session.add(user)
    db.session.commit()

    return user

#####################################################################

def get_user_by_email(email):
    
    return User.query.filter(User.email == email).first()

#####################################################################

def create_recipe(recipe_name, description, photo):

    recipe = Recipe(recipe_name=recipe_name, description=description,
                    photo=photo) 
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

def create_ingredient(ingredient_name):

    ingredient = Ingredient(ingredient_name=ingredient_name) 
    db.session.add(ingredient)
    db.session.commit()

    return ingredient

#####################################################################
def get_all_recipes():
    
#####################################################################


if __name__== '__main__':
    from server import app
    connect_to_db(app)