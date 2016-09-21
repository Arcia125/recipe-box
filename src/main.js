
import React from 'react';
import ReactDOM from 'react-dom';
import style from './main.scss';
import RecipeBox from './app/recipebox';

var recipeKey = '_kh_recipeBook';
var recipes = [];
console.log('hello world');

function setRecipes() {
    let defaultRecipes = [{
        "recipeName": "Pizza",
        "ingredients": ["Crust", "Sauce", "Toppings"]
    }, {
        "recipeName": "Pie",
        "ingredients": ["Crust", "Filling"]
    }];
    let localStorageExists = ('localStorage' in window) && window['localStorage'] !== null;
    let recipeBookExists = recipeKey in localStorage && localStorage[recipeKey] !== undefined;
    console.log(localStorageExists && recipeBookExists);
    recipes = localStorageExists && recipeBookExists ?
        JSON.parse(localStorage.getItem(recipeKey)) : defaultRecipes;
}
setRecipes();

ReactDOM.render(<RecipeBox recipes={recipes} storageKey={recipeKey} />, document.getElementById('react-app'));