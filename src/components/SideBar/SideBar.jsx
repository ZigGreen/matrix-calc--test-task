import React, { Component, addons } from 'react/addons';
import Group from '../Group/Group'
import './sidebar.less'

export default class SideBar extends Component {
    render() {
        let {className, active,error, ...props} = this.props;
        let cx = addons.classSet;
        let classes = cx({
            "sidebar": true,
            "--active-state": active,
            "--error-state": error
        });
        return (
            <div className={classes}>
                {this.props.children}
                <Group>
                    <p className="sidebar__error">{error}</p>
                </Group>
            </div>
        );
    }
}