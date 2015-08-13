import React,{ Component } from 'react';
import './style.less';

export default class ArrowButton extends Component {

    render() {
        let {children, ...props} = this.props;
        return (
            <button className="arrow-button" {...props}>
                <div className="btn">
                    <div className="cb">
                        <div className="c">{children}</div></div>
                    <div className="a">
                        <div className="b">
                            <div className="d">
                            </div>
                        </div>
                    </div>

                </div>
            </button>
        );
    }
}