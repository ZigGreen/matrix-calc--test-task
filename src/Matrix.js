export default class Matrix {
    constructor(rows, cols, initial) {

        for (let i = 0, store = this._store = []; i < rows; i++) {
            store.push([]);
            for (let j = 0; j < cols; j++) {
                store[i][j] = initial;
            }
        }

    }

    rows() {
        return this._store.length;
    }

    columns() {
        return this._store[0].length;
    }

    getAt(i, j) {
        return this._store[i][j];
    }

    getData() {
        return this._store;
    }

    setValue(i, j, val) {
        this._store[i][j] = val
    }

    getRow(i) {
        return new MatrixRow(this, i);
    }

    addRow() {
        var row = [];
        for (let j = 0; j < this.columns(); j++) row.push(void 0);
        this._store.push(row);
    }

    addColumn() {
        for (let j = 0; j < this.rows(); j++)
            this._store[j].push(void 0);
    }

    removeRow() {
        this._store.pop();
    }

    removeColumn() {
        for (let j = 0; j < this.rows(); j++)
            this._store[j].pop();
    }

    getColumn(i) {
        return new MatrixColumn(this, i);
    }

    static scalarMultiply(x, y) {
        return x.reduce((sum, el, i) => sum + el * y.getAt(i), 0)
    }

    static multiply(a, b) {
        let result = new Matrix(a.rows(), b.columns());

        for (let i = 0; i < a.rows(); i++) {
            for (let j = 0; j < b.columns(); j++) {
                let value = Matrix.scalarMultiply(a.getRow(i), b.getColumn(j));
                result.setValue(i, j, isNaN(value) ? void 0 : value)
            }
        }

        return result;
    }
}

class MatrixVector {
    constructor(matrix, index) {
        this.matrix = matrix;
        this.index = index
    }

    reduce(cb, initial) {
        var prev = initial,
            i = 0,
            len = this.size();
        for (; i < len; prev = cb(prev, this.getAt(i), i++)) {
        }
        return prev;
    }
}


class MatrixColumn extends MatrixVector {

    size() {
        return this.matrix.rows();
    }

    getAt(index) {
        return this.matrix.getAt(index, this.index);
    }
}

class MatrixRow extends MatrixVector {
    size() {
        return this.matrix.columns();
    }

    getAt(index) {
        return this.matrix.getAt(this.index, index);
    }
}