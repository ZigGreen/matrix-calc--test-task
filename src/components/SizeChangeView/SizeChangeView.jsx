import React, { Component } from 'react';
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import './size-change.less'

export default class SizeChangeView extends Component {
    render() {
        let {label, max, min, value, onAdd, onSub} = this.props;
        let disabled = value>=max ? 'add' : value<=min ? 'sub' : '';
        return (
            <div className="size-change">
                <Button className="size-change__button" onClick={onAdd} disabled={disabled == 'add'}><Icon icon="plus"/>Добавить</Button>
                <Button className="size-change__button" onClick={onSub} disabled={disabled == 'sub'}><Icon icon="minus"/>Удалить</Button>
                <div className="size-change__label">{label}</div>
            </div>
        );
    }
}