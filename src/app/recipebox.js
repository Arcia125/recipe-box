import React from 'react';
import InputBox from './components/inputbox/inputbox';
import Modal from './components/modal/modal';
import Recipe from './components/recipe/recipe';
var recipeKey = '_kh_recipeBook';

class RecipeBox extends React.Component {
    componentWillMount() {
        this.state = {
            modalIsOpen: false,
            recipes: this.props.recipes
        };
    }
    openModal(modalType, recipeName, ingredients, recipeID) {
        this.setState({
            modalIsOpen: true,
            modalType: modalType,
            recipeValue: recipeName,
            ingredientValue: ingredients.join(', '),
            lastEdit: recipeID
        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false,
            modalType: 'add-recipe',
            recipeValue: '',
            ingredientValue: ''
        });
    }
    handleChange(event) {
        if (event.target.name == 'recipe') {
            this.setState({
                recipeValue: event.target.value
            });
        }else if (event.target.name == 'ingredient') {
            this.setState({
                ingredientValue: event.target.value
            })
        }
    }
    makeRecipe(name, ingredients) {
        return {
            "recipeName": name,
            "ingredients": [...ingredients]
        };
    }
    saveRecipe(modalType, recipeName, ingredients, recipeID) {
        let recipe = this.makeRecipe(recipeName, ingredients.split(', '));
        let recipeArray = this.state.recipes.map(a => a);
        if (modalType == 'add-recipe') {
            recipeArray.push(recipe);
            this.setState({
                recipes: recipeArray,
                modalIsOpen: false,
                modalType: 'add-recipe',
                recipeValue: '',
                ingredientValue: ''
            });
        }else if (modalType == 'edit-recipe') {
            recipeArray.splice(recipeID, 1, recipe);
            this.setState({
                recipes: recipeArray,
                modalIsOpen: false,
                modalType: 'add-recipe',
                recipeValue: '',
                ingredientValue: ''
            });
        }
    }
    deleteRecipe(recipeID) {
        this.state.recipes.splice(recipeID, 1);
        this.setState({
            recipes: this.state.recipes
        });
    }

    render() {
        let recipeList = this.state.recipes;
        localStorage.setItem(this.props.storageKey, JSON.stringify(recipeList));
        let recipes =
            recipeList.map((recipeObj, objID) =>
                (
                    <Recipe
                        recipeName={recipeObj.recipeName}
                        ingredients={recipeObj.ingredients}
                        key={objID}
                    >
                        <button
                            onClick={() => this.deleteRecipe(objID)}
                            className='recipe-button-delete'
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => this.openModal('edit-recipe', recipeObj.recipeName, recipeObj.ingredients, objID)}
                            className='recipe-button-edit'
                        >
                            Edit
                        </button>
                    </Recipe>
                )
            );
        let modalIsOpen = this.state.modalIsOpen;
        let modalType = this.state.modalType;
        let modalHeader = modalType == 'edit-recipe' ? 'Edit recipe' : 'Add a recipe';
        let recipeValue = this.state.recipeValue;
        let ingredientValue = this.state.ingredientValue;
        return (
            <div className='app'>
                <Modal isOpen={modalIsOpen}>
                    <button onClick={() => this.closeModal()} className='modal-close'>x</button>
                    <h1 className='react-modal-header'>
                        {modalHeader}
                    </h1>
                    <InputBox label='Recipe'>
          <textarea name='recipe' value={recipeValue} onChange={this.handleChange.bind(this)} className='input-area'>
        </textarea>
                    </InputBox>
                    <InputBox label='Ingredients'>
            <textarea name='ingredient' value={ingredientValue} onChange={this.handleChange.bind(this)} className='input-area'>
        </textarea>
                    </InputBox>
                    <button onClick={() => this.saveRecipe(modalType, recipeValue, ingredientValue, this.state.lastEdit)} className='save-recipe'>
                        Save Recipe
                    </button>
                </Modal>
                <div className='react-container'>
                    <h1 className='react-title' >Recipe Book</h1>
                    {recipes}
                    <button onClick={() => this.openModal('add-recipe', '', [])} className='add-recipe'>
                        Add Recipe
                    </button>
                </div>
            </div>
        );
    }
}



export default RecipeBox;