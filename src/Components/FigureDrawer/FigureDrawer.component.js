import React, { PureComponent } from 'react';

class FigureDrawer extends PureComponent {
    constructor() {
        super();
        this.controlpoints = React.createRef();
        this.canvas = React.createRef();
        this.selectedElement = React.createRef();
        this.angle = React.createRef();
        this.state = {
            hasRendered: false,
            poly: []
        };
    }

    onDrawClick() {
        const points = this.controlpoints.current.value;
        this.drawPolygon(parseInt(points, 10));
    }

    drawPolygon(points) {
        const canvas = this.canvas.current.getBoundingClientRect();
        this.drawShape(canvas.width / 2, canvas.height / 2, points, 50, 50, 0);
    }

    drawShape(centerx, centery, points, radius1, radius2, alpha0, filltext = true) {
        const ctx = this.canvas.current.getContext('2d');
        // eslint-disable-next-line no-param-reassign
        points = radius2 !== radius1 ? 2 * points : points;
        const poly = [];
        for (let i = 0; i <= points; i++) {
            const angle = (i * 2 * Math.PI) / points - Math.PI / 2 + alpha0;
            const radius = i % 2 === 0 ? radius1 : radius2;
            const x = centerx + radius * Math.cos(angle);
            const y = centerx + radius * Math.sin(angle);
            if (!filltext) ctx.moveTo(x, y);
            ctx.lineTo(x, y);
            if (filltext && i !== 0) ctx.fillText(i, x - 5, y - 5);
            poly.push({ number: i, x, y });
        }
        ctx.strokeStyle = '#bada55';
        ctx.fillStyle = '#bada55';
        ctx.lineWidth = 2;
        ctx.stroke();
        console.log(poly);
        this.setState({ hasRendered: true, poly });
    }

    pointSelect() {
        const { poly } = this.state;
        return (
          <>
              <label htmlFor="availablePoints">
                  Select point
             <select
               id="availablePoints"
               name="lol"
               ref={ this.selectedElement }
             >
                 { poly.map(({ number }) => (<option key={ number } value={ number }>{ number }</option>)) }
             </select>
              </label>
              <label htmlFor="angle">
                  Select Angle to rotate
                  <input
                    type="number"
                    id="angle"
                    min="-360"
                    max="360"
                    ref={ this.angle }
                  />
              </label>
              <button
                onClick={ () => this.rotate() }
              >
                  Rotate
              </button>
          </>
        );
    }

    rotate() {
        const { poly } = this.state;
        const elem = parseInt(this.selectedElement.current.value, 10);
        const angle = parseInt(this.angle.current.value, 10);
        const points = parseInt(this.controlpoints.current.value, 10);
        const { x, y } = poly.find(({ number }) => number === elem);
        this.rotateThing(x, y, -angle * (Math.PI / 180), points);
    }

    rotateThing(centerX, centerY, theAngle, sides) {
        const ctx = this.canvas.current.getContext('2d');
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(theAngle);
        ctx.translate(-50, 0);
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
            const x = 50 * Math.cos((i * 2 * Math.PI) / sides);
            const y = 50 * Math.sin((i * 2 * Math.PI) / sides);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
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
                    Number of points
                    <input type="number" ref={ this.controlpoints } id="controlpoints" min="3" max="11" />
                </label>
                <button onClick={ () => this.onDrawClick() }>
                    Draw
                </button>
            </div>
        );
    }

    render() {
        const { hasRendered } = this.state;
        return (
            <div>
                { this.renderCanvas() }
                { this.renderControls() }
                { hasRendered ? this.pointSelect() : null }
            </div>
        );
    }
}

export default FigureDrawer;
