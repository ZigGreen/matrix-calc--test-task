import React, { Component, PropTypes } from 'react';
import Input from '../MatrixInput/MatrixInput'
import './MatrixView.less'

export default class MatrixView extends Component {

    render() {
        var rows = this.props.matrix.map((row, rowIndex) =>
                (<tr>
                    {row.map((value, columnIndex) => (
                        <td>
                            <Input disabled={this.props.disabled}
                                   placeholder={`${this.props.matrixName}${rowIndex+1},${columnIndex+1}`}
                                   value={value==undefined ? "": value}
                                   onFocus={this.props.onFocus}
                                   onBlur={this.props.onBlur}
                                   onChange={e => this.props.onChange(rowIndex, columnIndex, e.target.value)}/>
                        </td>
                    ))}
                </tr>)
        );

        return (
            <div className="matrix-view">
                <div className="matrix-view__bracket --open-bracket"></div>
                <table className="matrix-view__table"><tbody>{rows}</tbody></table>
                <div className="matrix-view__bracket --close-bracket"></div>
            </div>
        );
    }
}
MatrixView.propTypes = {
    matrix: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    matrixName: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};