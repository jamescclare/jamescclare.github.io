import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import TerminalLines from './components/TerminalLines';

const App = () => <div>
    <TerminalLines
        lines={[
            { text: 'jclare.dev', typeCharPerSec: 0.1 },
            { text: 'NAME="James Clare"', typeCharPerSec: 0.08 },
            { text: 'OCCUPATION="Software Engineer"', typeCharPerSec: 0.08 },
            { text: '', typeCharPerSec: 0.1 },
        ]} 
    />
</div>;

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);

