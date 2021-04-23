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
    
    def __repr__(self):
        return f"<<User user_id={self.user_id} email={self.email}>>"
####################################################################################

class Recipe(db.Model):
    """Recipes Table"""

    __tablename__ = "recipes"

    recipe_id = db.Column(db.Integer, primary_key=True,
                        autoincrement=True)
    recipe_name = db.Column(db.String(100))
    description = db.Column(db.Text)
    photo = db.Column(db.String(100))
    cuisine_id = db.Column(db.Integer, db.ForeignKey("cuisines.cuisine_id"))
    ingredient_id = db.column(db.Integer, db.ForeignKey("ingredients.ingredient_id"))


    def __repr__(self):
        return f'<<Recipe recipe_id={self.recipe_id} name={self.recipe_name}>>'
####################################################################################





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