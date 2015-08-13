import React, { Component } from 'react';
import './usual-button.less';

export default class Button extends Component {

    render() {
        let {children, className, ...props} = this.props;
        return (
            <button className={"usual-button "+className} {...props}>
                {children}
            </button>
        );
    }
}