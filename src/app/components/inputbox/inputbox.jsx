import React from 'react';


class InputBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let label = this.props.label;
        let children = this.props.children;
        return (
            <div className='input-div'>
                <h2 className='input-label'>
                    {label}
                </h2>
                {children}
            </div>
        );
    }
}

export default InputBox;