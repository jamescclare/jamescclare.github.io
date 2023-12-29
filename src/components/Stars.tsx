import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Stars.module.css';
import { useResizeableRef } from '../utils/hooks';

const cx = classNames.bind(styles);

type Coord = [x: number, y: number];
type Vector = { direction: number, magnitude: number };
type Star = { vector: Vector, distance: number };

const randomCoord = (range: number) => ((Math.random() * 2) - 1) * range;
const isOutOfBounds = (vector: Vector) => vector.magnitude > 1;

const createRandomStar = (): Star => {
    const [x, y] = [randomCoord(1), randomCoord(1)];

    const direction = Math.atan2(x,y);
    const magnitude = toMagnitude([x, y]);

    return { 
        vector: {
            direction,
            magnitude,
        },
        distance: Math.random(),
    };
};

const toMagnitude = ([x, y]: Coord) => Math.sqrt(x**2 + y**2);

const increaseMagnitude = (star: Star, velocity: number) => {
    const { vector, distance } = star;
    const { magnitude, direction } = vector;
    const delta = velocity * magnitude**2 * (1 - distance);

    return {
        ...star,
        vector: {
            direction,
            magnitude: Math.max(magnitude + delta, 0),
        }
    };
};
 
type StarLine = { star: Star, line: Vector };
const addLine = (star: Star, velocity: number): StarLine => {
    const { vector, distance } = star;
    const { magnitude, direction } = vector;
    const delta = 10 * velocity * magnitude**2 * (1 - distance);

    return {
        star,
        line: {
            direction,
            magnitude: Math.max(magnitude - delta, 0),
        }
    };
};

type Props = { starCount: number, velocity: number };

const Stars = ({ starCount, velocity }: Props) => {
    const canvasRef = React.useRef<HTMLCanvasElement>();
    const starsRef = React.useRef<Star[]>([]);

    const toScreenspaceCoords = ({ magnitude, direction }: Vector): Coord => {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        const reference = Math.max(width, height) / 2;
        const scaleBy = Math.sqrt(2 * reference ** 2);

        const xUnit = magnitude * Math.cos(direction);
        const yUnit = magnitude * Math.sin(direction);

        const scale = (unit: number) => unit * scaleBy + reference;

        return [scale(xUnit), scale(yUnit)];
    };

    const [containerRef, bounds] = useResizeableRef<HTMLDivElement>();
    const fitType = bounds.width > bounds.height
        ? 'fit-width'
        : 'fit-height';

    React.useEffect(() => {
        starsRef.current = new Array(starCount)
            .fill(null)
            .map(() => createRandomStar());
    }, []);

    React.useEffect(() => {
        let stop = false;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';

        const paint = () => {
            if (stop) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const stars = starsRef.current;
            
            const movedStars = stars.map(star => increaseMagnitude(star, velocity));
            const allStarLines = movedStars.map(star => addLine(star, velocity));

            const validStarLines = allStarLines.filter(star => !isOutOfBounds(star.line));
            const requiredNewStars = starCount - validStarLines.length; 
            const newStarLines = new Array(requiredNewStars)
                .fill(null)
                .map(() => addLine(createRandomStar(), velocity));
            const paintableStarLines = [...validStarLines, ...newStarLines];

            for (const { star, line } of paintableStarLines) {
                ctx.lineWidth = (1 - star.distance) * 3;

                const [moveX, moveY] = toScreenspaceCoords(star.vector);
                const [lineX, lineY] = toScreenspaceCoords(line);

                ctx.beginPath();
                ctx.moveTo(moveX, moveY);
                ctx.lineTo(lineX, lineY);
                ctx.stroke();

                const radius = ctx.lineWidth / 2;
                const twoPi = 2 * Math.PI;

                ctx.beginPath();
                ctx.arc(moveX, moveY, radius, 0, twoPi);
                ctx.fill();
                ctx.beginPath();

                ctx.fill();
            }

            const latestStars = paintableStarLines.map(({ star }) => star);
            starsRef.current = latestStars;

            requestAnimationFrame(paint);
        };

        paint();

        return () => { stop = true; };
    }, [velocity, bounds]);

    return <div ref={containerRef} className={cx('center', 'container')}>
        <canvas ref={canvasRef} className={cx('stars', fitType)} />
    </div>
};

export { Stars };
export default Stars;
