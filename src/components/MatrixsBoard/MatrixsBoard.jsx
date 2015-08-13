import React, { Component, PropTypes } from 'react';
import MatrixView from '../MatrixView/MatrixView'
import './matrixs-board.less'

export default class MatrixsBoard extends Component {
    render() {
        let {a,b,c} = this.props.matrix;
        return (
            <table className="matrixs-board">
                <tbody>
                <tr>
                    <td>
                        <MatrixView disabled="true" matrixName="c" matrix={c.getData()}>
                        </MatrixView>
                    </td>
                    <td>
                        <MatrixView matrixName="a"
                                    matrix={a.getData()}
                                    onFocus={this.props.onFocus}
                                    onBlur={this.props.onBlur}
                                    onChange={(i,j,v) => this.props.onChange(a,i,j,v)}>
                        </MatrixView>
                    </td>
                    <td className="matrixs-board__table-label">A</td>
                </tr>
                <tr>
                    <td>
                        <MatrixView matrixName="b"
                                    matrix={b.getData()}
                                    onFocus={this.props.onFocus}
                                    onBlur={this.props.onBlur}
                                    onChange={(i,j,v) => this.props.onChange(b,i,j,v)}>
                        </MatrixView>
                    </td>
                </tr>
                <tr>
                    <td className="matrixs-board__table-label --B-caption">B</td>
                </tr>
                </tbody>
            </table>
        );
    }
}
MatrixsBoard.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};