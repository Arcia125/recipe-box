import React from 'react';
class Ingredient extends React.Component {
    render() {
        let children = this.props.children;
        return (
            <div className='recipe-ingredient'>
                {children}
            </div>
        );
    }
}
export default Ingredient;