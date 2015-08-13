import React, { Component } from 'react';
import RadioInput from '../RadioInput/RadioInput'

export default class Choice extends Component {
    render() {
        return (
            <div>
                {
                    this.props.options.map(option => (
                        <RadioInput name="change"
                                    checked={this.props.selected == option.id}
                                    onChange={()=> this.props.onChange(option.id)}>
                            {option.name}
                        </RadioInput>
                    ))
                }
            </div>
        );
    }
}