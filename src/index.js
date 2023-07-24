import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import './styles/index.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <Router>
      <GlobalStyle />
      <App />
    </Router>
);
