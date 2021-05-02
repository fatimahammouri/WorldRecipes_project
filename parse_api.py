"""Functions to parse the recipes details from the API response"""

from model import connect_to_db
import requests
from pprint import pformat, pprint  

def parse_recipe_details(complex_results):
    """extracting the needed information 
        from the results list (API response)"""


    recipe_details = {}
    
    recipe_details['title'] = complex_results['title']
    # recipe_details['instructions'] = complex_results['instructions']
    recipe_details['image'] = complex_results['image']
    recipe_details['servings'] = complex_results['servings']
    recipe_details['readyInMinutes'] = complex_results['readyInMinutes']
    recipe_details['sourceUrl'] = complex_results['sourceUrl']

    for each_step in complex_results['analyzedInstructions'][0]['steps']:
        instructions = list(each_step['step'])
        recipe_details['instructions'] = instructions


    return recipe_details