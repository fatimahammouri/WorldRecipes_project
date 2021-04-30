"""Models"""

from flask_sqlalchemy import SQLAlchemy 
db = SQLAlchemy()



class User(db.Model):
    """Users Table"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True,
                        autoincrement=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    username = db.Column(db.String(50))
    def __repr__(self):
        return f"<<User user_id={self.user_id} email={self.email}>>"
###################################################################################################

class Recipe(db.Model):
    """Recipes Table"""

    __tablename__ = "recipes"

    recipe_id = db.Column(db.Integer, primary_key=True,
                        autoincrement=True)
    title = db.Column(db.String(100))
    instructions = db.Column(db.Text)
    image = db.Column(db.String(100))
    
    # cuisines = db.relatioship("cuisines")
    # ingredients = db.relatioship("ingredients")
    def __repr__(self):
        return f'<<Recipe recipe_id={self.recipe_id} name={self.recipe_name}>>'
###################################################################################################

class Cuisine(db.Model):
    """Cuisine"""

    __tablename__ = "cuisines"

    cuisine_id = db.Column(db.Integer, primary_key=True,
                        autoincrement=True)
    cuisine_name = db.Column(db.String(100))
    
    
    def __repr__(self):
        return f'<<Cuisine cuisine_id={self.cuisine_id} name={self.cuisine_name}>>'

###################################################################################################

class Ingredient(db.Model):
    """Ingredients Model"""

    __tablename__ = "ingredients"

    ingredient_id = db.Column(db.Integer, primary_key=True,
                        autoincrement=True)
    ingredient_name = db.Column(db.String(100))
    # recipes = db.relationship("recipes")
    
    def __repr__(self):
        return f'<<Ingredient ingredient_id={self.ingredient_id} name={self.ingredient_name}>>'

###################################################################################################

class Ingredient_recipe(db.Model):

    __tablename__ = "ingredient_recipe"

    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.ingredient_id"), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.recipe_id"),primary_key=True)

    ingredient = db.relationship("Ingredient", backref= "recipes")
    recipe = db.relationship("Recipe", backref="ingredients")

    def __repr__(self):
        return f'<<Ingredient_recipe ingredient={self.ingredient} recipe={self.recipe}>>'

###################################################################################################       
class recipe_cuisine(db.Model):

    __tablename__ = "recipe_cuisine"

    cuisine_id = db.Column(db.Integer, db.ForeignKey("cuisines.cuisine_id"), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.recipe_id"),primary_key=True)

    recipe = db.relationship("Recipe", backref="cuisines")
    cuisine = db.relationship("Cuisine", backref= "recipes")

    def __repr__(self):
        return f'<<Ingredient_recipe cuisine={self.cuisine} recipe={self.recipe}>>'

###################################################################################################




def connect_to_db(flask_app, db_uri='postgresql:///recipes', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app


    connect_to_db(app)