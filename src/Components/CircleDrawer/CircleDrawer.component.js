import React, { PureComponent } from 'react';
import './CircleDrawer.style.scss';

class CircleDrawer extends PureComponent {
    constructor() {
        super();
        this.radiusInput = React.createRef();
        this.adjInputX = React.createRef();
        this.adjInputY = React.createRef();
        this.canvas = React.createRef();
        this.DrawCanvas = React.createRef();
        this.x1 = React.createRef();
        this.y1 = React.createRef();

        this.state = {
            mouseDown: false,
            checked: true
        };
    }

    componentDidMount() {
        this.drawLines();
    }

    drawLines() {
        const canvas = this.canvas.current.getBoundingClientRect();
        const ctx = this.canvas.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width, canvas.height);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.width / 2);
        ctx.stroke();
    }

    drawCircle(startX, startY, radius, color = '#000', ctx = this.canvas.current.getContext('2d'), fill = true) {
        ctx.fillStyle = color;
        let x = 0;
        let y = parseInt(radius, 10);
        let dP = 3 - 2 * radius;

        while (y >= x) {
            x++;
            if (dP > 0) {
                y--;
                dP = dP + 4 * (x - y) + 10;
            } else {
                dP = dP + 4 * x + 6;
            }
            if (fill) {
                ctx.fillRect(startX + x, startY + y, 1, 1);
                ctx.fillRect(startX - x, startY + y, 1, 1);
                ctx.fillRect(startX + x, startY - y, 1, 1);
                ctx.fillRect(startX - x, startY - y, 1, 1);
                ctx.fillRect(startX + y, startY + x, 1, 1);
                ctx.fillRect(startX - y, startY + x, 1, 1);
                ctx.fillRect(startX + y, startY - x, 1, 1);
                ctx.fillRect(startX - y, startY - x, 1, 1);
            } else {
                ctx.clearRect(startX + x, startY + y, 1, 1);
                ctx.clearRect(startX - x, startY + y, 1, 1);
                ctx.clearRect(startX + x, startY - y, 1, 1);
                ctx.clearRect(startX - x, startY - y, 1, 1);
                ctx.clearRect(startX + y, startY + x, 1, 1);
                ctx.clearRect(startX - y, startY + x, 1, 1);
                ctx.clearRect(startX + y, startY - x, 1, 1);
                ctx.clearRect(startX - y, startY - x, 1, 1);
            }
        }
    }

    drawUserMovingCircle(e) {
        const {
            mouseDown, startX, startY, lastRadius
        } = this.state;
        if (mouseDown) {
            const canvas = this.canvas.current.getBoundingClientRect();
            const ctx = this.DrawCanvas.current.getContext('2d');
            const x2 = e.clientX - canvas.left;
            const y2 = e.clientY - canvas.top;
            const radius = Math.sqrt((x2 - startX) ** 2 + (y2 - startY) ** 2);

            this.drawCircle(startX, startY, lastRadius, '#fff', ctx, false);
            this.drawCircle(startX, startY, radius, '#000', ctx);
            this.setState({ lastRadius: radius });
        }
    }

    drawellispe(rx, ry, xc, yc) {
        let dx; let dy; let d1; let d2; let x; let y;
        x = 0;
        y = ry;
        const ctx = this.canvas.current.getContext('2d');
        d1 = (ry * ry) - (rx * rx * ry)
        + (0.25 * rx * rx);
        dx = 2 * ry * ry * x;
        dy = 2 * rx * rx * y;

        while (dx < dy) {
            console.log(`${x + xc},`, y + yc);
            console.log(`${-x + xc},`, y + yc);
            console.log(`${x + xc},`, -y + yc);
            console.log(`${-x + xc},`, -y + yc);
            ctx.fillRect(x + xc, y + yc, 1, 1);
            ctx.fillRect(-x + xc, y + yc, 1, 1);
            ctx.fillRect(x + xc, -y + yc, 1, 1);
            ctx.fillRect(-x + xc, -y + yc, 1, 1);

            if (d1 < 0) {
                x++;
                dx += (2 * ry * ry);
                d1 = d1 + dx + (ry * ry);
            } else {
                x++;
                y--;
                dx += (2 * ry * ry);
                dy -= (2 * rx * rx);
                d1 = d1 + dx - dy + (ry * ry);
            }
        }

        d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5)))
    + ((rx * rx) * ((y - 1) * (y - 1)))
    - (rx * rx * ry * ry);

        while (y >= 0) {
            console.log(`${x + xc},`, y + yc);
            console.log(`${-x + xc},`, y + yc);
            console.log(`${x + xc},`, -y + yc);
            console.log(`${-x + xc},`, -y + yc);
            ctx.fillRect(x + xc, y + yc, 1, 1);
            ctx.fillRect(-x + xc, y + yc, 1, 1);
            ctx.fillRect(x + xc, -y + yc, 1, 1);
            ctx.fillRect(-x + xc, -y + yc, 1, 1);

            if (d2 > 0) {
                y--;
                dy -= (2 * rx * rx);
                d2 = d2 + (rx * rx) - dy;
            } else {
                y--;
                x++;
                dx += (2 * ry * ry);
                dy -= (2 * rx * rx);
                d2 = d2 + dx - dy + (rx * rx);
            }
        }
    }


    clearCanvas() {
        const canvas = this.canvas.current.getBoundingClientRect();
        const ctx = this.canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawLines();
    }

    startUserCircleDraw(e) {
        const canvas = this.canvas.current.getBoundingClientRect();
        this.setState({
            mouseDown: true,
            startX: e.clientX - canvas.left,
            startY: e.clientY - canvas.top
        });
    }

    stopUserCircleDraw() {
        const {
            startX, startY, lastRadius
        } = this.state;
        this.setState({ mouseDown: false });
        const canvas = this.DrawCanvas.current.getBoundingClientRect();
        const ctx = this.DrawCanvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawCircle(startX, startY, lastRadius);
        this.setState({ lastRadius: 0 });
    }

    drawPointCircle() {
        const { checked } = this.state;
        const canvas = this.DrawCanvas.current.getBoundingClientRect();
        const startX = !checked ? parseInt(this.x1.current.value, 10) : canvas.width / 2;
        const startY = !checked ? parseInt(this.y1.current.value, 10) : canvas.height / 2;

        if (this.radiusInput.current.value) {
            this.drawCircle(startX, startY, this.radiusInput.current.value);
        } else {
            const adjX = this.adjInputX.current.value;
            const adjY = this.adjInputY.current.value;
            const radius = Math.sqrt((adjX - startX) ** 2 + (adjY - startY) ** 2);
            this.drawCircle(startX, startY, radius);
        }
    }

    toggleCheckedState() {
        const { checked } = this.state;
        this.setState({ checked: !checked });
    }

    renderFromCenter() {
        const { checked } = this.state;
        return (
            <>
                <label className="coord-input" htmlFor="centerCheckbox">
                    X1 and Y1 are center
                    <input
                      id="centerCheckbox"
                      type="checkbox"
                      defaultChecked={ checked }
                      onChange={ () => this.toggleCheckedState() }
                    />
                </label>
                <label
                  htmlFor="x1"
                  className="coord-input"
                >
                    X1
                    <input
                      id="x1"
                      type="number"
                      className="radiusbox"
                      ref={ this.x1 }
                      disabled={ checked }
                    />
                </label>
                <label
                  htmlFor="y1"
                  className="coord-input"
                >
                    Y1
                    <input
                      id="y1"
                      type="number"
                      className="radiusbox"
                      ref={ this.y1 }
                      disabled={ checked }
                    />
                </label>
            </>
        );
    }

    renderCanvas() {
        return (
            <>
                <canvas
                  ref={ this.canvas }
                  className="Canvas"
                  width={ 500 }
                  height={ 500 }
                />
                <canvas
                  ref={ this.DrawCanvas }
                  className="Draw-canvas"
                  width={ 500 }
                  height={ 500 }
                  onMouseDown={ (e) => this.startUserCircleDraw(e) }
                  onMouseUp={ () => this.stopUserCircleDraw() }
                  onMouseMove={ (e) => this.drawUserMovingCircle(e) }
                />
                <div
                  className="wrapper"
                >
                    { this.renderFromCenter() }
                    <label
                      htmlFor="x1"
                      className="coord-input"
                    >
                        Radius
                        <input
                          id="x1"
                          type="number"
                          className="radiusbox"
                          ref={ this.radiusInput }
                        />
                    </label>
                    <label
                      htmlFor="adjx"
                      className="coord-input"
                    >
                        Pieskare X
                        <input
                          id="adjx"
                          type="number"
                          className="radiusbox"
                          ref={ this.adjInputX }
                        />
                    </label>
                    <label
                      htmlFor="adjy"
                      className="coord-input"
                    >
                        Pieskare Y
                        <input
                          id="adjy"
                          type="number"
                          className="radiusbox"
                          ref={ this.adjInputY }
                        />
                    </label>
                    <button
                      className="drawbtn"
                      onClick={ () => this.drawPointCircle() }
                    >
                    Draw
                    </button>
                    <button
                      className="drawbtn"
                      onClick={ () => this.clearCanvas() }
                    >
                    Clear canvas
                    </button>
                    <button
                      className="drawbtn"
                      onClick={ () => this.drawellispe(3, 8, 0, 0) }
                    >
                        ellipse
                    </button>
                </div>
            </>
        );
    }

    render() {
        return (
            this.renderCanvas()
        );
    }
}

export default CircleDrawer;
