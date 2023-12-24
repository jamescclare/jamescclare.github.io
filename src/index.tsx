import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
    const [showCursor, setShowCursor] = React.useState(false);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowCursor(!showCursor);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [showCursor]);

    const cursor = showCursor ? '█' : '_';

    return <div className='content'>{`> jclare.dev${cursor}`}</div>;
};

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);

