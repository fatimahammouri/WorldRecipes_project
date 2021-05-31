"""Functions to parse the recipes details from the API response"""

from model import connect_to_db
import requests
from pprint import pformat, pprint  

def parse_recipe_details(complex_results):
    """extracting the needed information 
        from the results list (API response)"""


    recipe_details = {}
    ingredients = []
    recipe_details['title'] = complex_results['title']
    # recipe_details['instructions'] = complex_results['instructions']
    recipe_details['image'] = complex_results['image']
    recipe_details['servings'] = complex_results['servings']
    recipe_details['readyInMinutes'] = complex_results['readyInMinutes']
    recipe_details['sourceUrl'] = complex_results['sourceUrl']

    for each_step in complex_results['analyzedInstructions'][0]['steps']:
        instructions = each_step['step']
        recipe_details['instructions'] = instructions
    
    for each_ingredient in complex_results["extendedIngredients"]:
        ingredient = each_ingredient["originalString"]
        ingredients.append(ingredient)
    # print(ingredients)   
    recipe_details["ingredients"] = ingredients

    return recipe_details


# res = {"results":
# [
# {"id":729366,"title":"Plantain Salad","image":"https://spoonacular.com/recipeImages/729366-312x231.jpg","imageType":"jpg"},
# {"id":782600,"title":"Quinoa Salad with Vegetables and Cashews","image":"https://spoonacular.com/recipeImages/782600-312x231.jpg","imageType":"jpg"},
# {"id":715540,"title":"Summer Berry Salad","image":"https://spoonacular.com/recipeImages/715540-312x231.jpg","imageType":"jpg"}
# ]
# }
# data = res["results"]
# # print(data)
# for r in range(len(data)):
#     title = data[r]["title"]
#     print(title)