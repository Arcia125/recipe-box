import React from 'react';
import Ingredient from '../ingredient/ingredient';
class Recipe extends React.Component {
    componentWillMount() {
        this.state = {
            expanded: 'contracted'
        };
    }
    expand() {
        let expandedState = this.state.expanded == 'expanded' ? 'contracted' : 'expanded';
        this.setState({
            expanded: expandedState
        });
    }
    render() {
        let children = this.props.children;
        let expandedClass = this.state.expanded;
        let symbol = expandedClass == 'expanded' ? '-' : '+';
        let name = this.props.recipeName;
        let ingredientList = this.props.ingredients;
        let ingredients =
            ingredientList.map((ingredient, ingID) =>
                (<Ingredient
                    key={ingID}
                    >
                    {ingredient.length > 0 ? ingredient : 'none'}
                </Ingredient>));
        return (
            <div>
                <button onClick={() => this.expand()} className='recipe-button'>

                    <div className='recipe-button-contents'>
                        <div className='recipe-button-label'>
                            {name}
                        </div>
                        <div className='recipe-button-symbol'>
                            {symbol}
                        </div>

                    </div>

                </button>
                <div className='recipe-content'>

                    <div className={'recipe-tab ' + expandedClass}>
                        <h1 className='recipe-header'>Ingredients</h1>
                        <div className='recipe-ingredient-container'>
                        {ingredients}
                        </div>
                        <div className='recipe-button-container'>
                        {children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Recipe;