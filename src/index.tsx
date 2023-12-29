import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import Welcome from './stages/Welcome';

const App = () => <Welcome />;

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);

