import React from 'react';
class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let children = this.props.children;
        let displayClass = this.props.isOpen ? 'opened' : 'closed';
        return (
            <div className={'react-modal ' + displayClass}>

                <div className='react-modal-content'>

                    {children}
                </div>
            </div>
        );
    }
}
export default Modal;