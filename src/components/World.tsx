import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './World.module.css';
import { MAP_HEIGHT, MapSvgContainer, MapSvgPaths } from './MapSvg';

const cx = classNames.bind(styles);

const RADIUS = MAP_HEIGHT / 2;

const World = () => {
    return <div className={styles.world}>
            <MapSvgContainer>
                <defs>
                    <clipPath id="world-clip">
                        <circle cx={RADIUS} cy={RADIUS} r={RADIUS} />
                    </clipPath>
                </defs>
                <MapSvgPaths className={cx('map', 'first')} />
                <MapSvgPaths className={cx('map', 'second')} />
            </MapSvgContainer>
    </div>
};

export { World };
export default World;
