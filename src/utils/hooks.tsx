import * as React from 'react';

const useResizeObserver = (ref: React.RefObject<HTMLElement>, onResize: (bounds: DOMRect) => void): void => {
    React.useEffect(() => {
        const element = ref.current;

        const handleResize = () => {
            const bounds = element.getBoundingClientRect();
            onResize(bounds);
        };
        handleResize();

        const observer = new ResizeObserver(() =>
            window.requestAnimationFrame(handleResize)
        ); 
        observer.observe(element);

        return () => observer.unobserve(element);
    }, []);
};

const DEFAULT_BOUNDS: DOMRect = {
    x: 0,
    y: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    toJSON: () => DEFAULT_BOUNDS,
};

type ResizableRef<T extends HTMLElement> = [React.RefObject<T>, DOMRect];
const useResizeableRef = <T extends HTMLElement>(): ResizableRef<T> => {
    const ref = React.useRef<T>();
    const [bounds, setBounds] = React.useState<DOMRect>(DEFAULT_BOUNDS);
    useResizeObserver(ref, setBounds);

    return [ref, bounds];
};

export { useResizeObserver, useResizeableRef };
