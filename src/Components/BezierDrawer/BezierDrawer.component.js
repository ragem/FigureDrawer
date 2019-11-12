import React, { PureComponent } from 'react';

class BezierDrawer extends PureComponent {
    constructor() {
        super();
        this.controlpoints = React.createRef();
        this.canvas = React.createRef();
        this.precision = React.createRef();
    }

    onDrawClick() {
        const controlpoints = this.controlpoints.current.value;
        this.drawCurve(this.generateRandomCoords(controlpoints));
    }

    bezier(t, plist) {
        const order = plist.length - 1;

        let y = 0;
        let x = 0;

        for (let i = 0; i <= order; i++) {
            // eslint-disable-next-line no-restricted-properties
            x += (this.binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].x));
            // eslint-disable-next-line no-restricted-properties
            y += (this.binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].y));
        }

        return {
            x, y
        };
    }

    binom(n, k) {
        let coeff = 1;
        for (let i = n - k + 1; i <= n; i++) coeff *= i;
        for (let i = 1; i <= k; i++) coeff /= i;
        return coeff;
    }

    generateRandomCoords(count) {
        const coords = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 500);
            const y = Math.floor(Math.random() * 500);
            coords.push({ x, y });
        }
        return coords;
    }

    drawCurve(plist) {
        const ctx = this.canvas.current.getContext('2d');
        const canvas = this.canvas.current.getBoundingClientRect();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const accuracy = parseFloat(this.precision.current.value);
        ctx.beginPath();
        ctx.moveTo(plist[0].x, plist[0].y);

        // eslint-disable-next-line no-restricted-syntax
        for (const p in plist) {
            if (p) {
                ctx.fillText(p, plist[p].x + 5, plist[p].y - 5);
                ctx.fillRect(plist[p].x - 5, plist[p].y - 5, 2, 2);
            }
        }

        for (let i = 0; i < 1; i += accuracy) {
            const { x, y } = this.bezier(i, plist);
            ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.closePath();
    }

    renderCanvas() {
        return (
            <canvas
              ref={ this.canvas }
              className="Canvas"
              width={ 500 }
              height={ 500 }
            />
        );
    }

    renderControls() {
        return (
            <div className="controls">
                <label htmlFor="controlpoints">
                    Number of control points
                    <input type="number" ref={ this.controlpoints } id="controlpoints" />
                </label>
                <label htmlFor="precision">
                    step precision
                    <input type="number" ref={ this.precision } id="precision" step="0.001" />
                </label>
                <button onClick={ () => this.onDrawClick() }>
                    Draw
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderCanvas() }
                { this.renderControls() }
            </div>
        );
    }
}

export default BezierDrawer;
