import React, { Component, addons } from 'react/addons';
import './matrix-text-input.less';

export default class TextInput extends Component {

    render() {
        let {className, ...props} = this.props;
        let cx = addons.classSet;
        return (
            <input type="text" {...props}
                   className={cx("matrix-text-input",className)}
                />
        );
    }
}