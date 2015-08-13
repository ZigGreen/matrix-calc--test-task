import React, { Component } from 'react';
import './radio-input.less'

export default class RadioInput extends Component {
    render() {
        let {label, children, disabled, ...props} = this.props;
        let stateClass = disabled? " --disabled-state" : '';
        return (
            <label className={"radio-input"+stateClass}>
                <input className="radio-input__input" type="radio" disabled={disabled} {...props} />
                <span className="radio-input__fake-input__focus">
                    <span className="radio-input__fake-input"></span>
                </span>
                <span className="radio-input__label">{label || children}</span>
            </label>
        );
    }
}