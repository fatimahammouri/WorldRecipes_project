"use strict"
let ingredientList = [];

let addIngredientBtn = document.getElementById("add_ingredient");//button
let ingredientInputElement = document.getElementById("ingredients");//input element
let ingredientValue = ingredientInputElement.value;//ingredient that users input
let listElement = document.querySelector("ul");


addIngredientBtn.addEventListener("click", (event) => {
    ingredientValue = ingredientInputElement.value;
    event.preventDefault();
    if (ingredientValue){
    ingredientList.push(ingredientValue);
    
    const element = document.createElement("li");
        element.textContent = ingredientValue;
        listElement.append(element);
        ingredientInputElement.value = "";
    }

});
