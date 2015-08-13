import React, { Component } from 'react';
import './button-group.less'

export default class ButtonGroup extends Component {
    render() {
        return (
            <div className="button-group">{this.props.children}</div>
        );
    }
}