import React, { Component } from 'react';
import ArrowButton from './components/ArrowButton/ArrowButton'
import SideBar from './components/SideBar/SideBar'
import Group from './components/Group/Group'
import Button from './components/Button/Button'
import Choice from './components/Choice/Choice'
import SizeChangeView from './components/SizeChangeView/SizeChangeView'
import MatrixsBoard from './components/MatrixsBoard/MatrixsBoard'
import Icon from './components/Icon/Icon'
import Matrix from './Matrix.js'
import 'normalize.css'
import './main.less'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            matrix: {
                a: new Matrix(4, 2),
                b: new Matrix(2, 3)
            },
            dimensions: {
                max: 10,
                min: 2
            },
            isFocused: false,
            activeMatrix: 'a'
        };
        this.resetResult();

    }

    multiplay() {
        this.state.matrix.c = Matrix.multiply(this.state.matrix.a, this.state.matrix.b);
        this.forceUpdate();
    }

    onMatrixChange(matrix, i, j, newValue) {
        if (!/^(10|\d|)$/.test(newValue)) return false;
        matrix.setValue(i, j, newValue == "" ? void 0 : ~~newValue);
        this.resetResult();
    }

    changeSize(type, diff) {
        let active = this.state.activeMatrix, m = this.state.matrix[active];

        if (type === "row") {
            diff > 0 ? m.addRow() : m.removeRow()
        } else {
            diff > 0 ? m.addColumn() : m.removeColumn()
        }
        this.resetResult();
    }


    swap() {
        let m = this.state.matrix;
        this.state.matrix = {
            a: m.b,
            b: m.a
        };
        this.resetResult();
    }

    resetResult() {
        var m = this.state.matrix;
        m.c = new Matrix(m.a.rows(), m.b.columns());
        this.forceUpdate();
    }

    clear() {
        this.setState({
            matrix: Object.keys(this.state.matrix).reduce((result, key) => {
                let m = this.state.matrix[key];
                result[key] = new Matrix(m.rows(), m.columns());
                return result;
            }, {})
        });
    }

    setFocus(isFocused) {
        this.setState({
            isFocused
        });
    }

    render() {
        let {max, min} = this.state.dimensions;
        let active = this.state.activeMatrix, m = this.state.matrix[active];
        let error, canMultiplay = this.state.matrix.a.columns() === this.state.matrix.b.rows();
        if (!canMultiplay)
        error = "Такие матрицы нельзя перемножить,\n так как количество столбцов матрицы А не равно количеству строк матрицы В";
        return (
            <div>
                <SideBar error={error} active={this.state.isFocused}>
                    <Group>
                        <ArrowButton disabled={!canMultiplay} onClick={::this.multiplay}>Умножить матрицы</ArrowButton>
                    </Group>
                    <Group>
                        <Button onClick={::this.clear}><Icon icon="refresh"/>Очистить матрицы</Button>
                        <Button onClick={::this.swap}><Icon icon="mix"/>Поменять матрицы местами</Button>
                    </Group>
                    <Group>
                        <Choice options={[{name:"Матрица А", id:"a"}, {name:"Матрица Б", id:"b"}]}
                                onChange={(activeMatrix) => this.setState({activeMatrix})}
                                selected={active}
                            ></Choice>
                        <SizeChangeView label="сктроку" max={max} min={min} value={m.rows()}
                                        onAdd={()=> this.changeSize("row",1)} onSub={() => this.changeSize("row",-1)}
                            ></SizeChangeView>
                        <SizeChangeView label="столбец" max={max} min={min} value={m.columns()}
                                        onAdd={()=> this.changeSize("column",1)}
                                        onSub={() => this.changeSize("column",-1)}
                            ></SizeChangeView>
                    </Group>
                </SideBar>
                <main className="main-view" style={{float: "left"}}>
                    <MatrixsBoard matrix={this.state.matrix}
                                  onFocus={this.setFocus.bind(this, true)}
                                  onBlur={this.setFocus.bind(this, false)}
                                  onChange={::this.onMatrixChange}>
                    </MatrixsBoard>
                </main>

            </div>
        );
    }
}
