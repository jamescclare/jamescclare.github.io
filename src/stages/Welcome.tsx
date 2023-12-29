import * as React from 'react';
import classNames from 'classnames/bind';
import { StageProps } from './types';
import TerminalText from '../components/TerminalText';
import styles from './Welcome.module.css';
import Stars from '../components/Stars';
import World from '../components/World';

const cx = classNames.bind(styles);

const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const Welcome = ({ onNext }: StageProps) => {
    const [animate, setAnimate] = React.useState(false);
    const [velocity, setVelocity] = React.useState(0.00);
    const [showWorld, setShowWorld] = React.useState(false);

    const startFlyIn = async () => {
        await wait(1000);
        setAnimate(true);
        setVelocity(0.02);
        await wait(3000);
        setShowWorld(true);
        await wait(5000);
        setVelocity(0.001);
    };

    return (
        <div className={cx('center', 'welcome')}>
            <div className={cx('terminal', 'center')}>
                <TerminalText
                    className={cx({ text: true, animate })}
                    text="load www.jclare.dev"
                    typeCharPerSec={0.05}
                    onComplete={startFlyIn}
                />
            </div>
            <div className={cx('center', 'stars')}>
                <Stars starCount={1000} velocity={velocity} />
            </div>
            <div className={cx('center', 'world')}>
                { showWorld && <World /> }
            </div>
        </div>
    );
};

export { Welcome };
export default Welcome;
