import React, { Component } from 'react';
import './icon.less'

export default class Icon extends Component {
    render() {
        return (
            <i className={"icon icon-"+this.props.icon}></i>
        );
    }
}