import './index.scss';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { initLoader } from './utils/initLoader';
import { BrowserRouter } from 'react-router-dom';

initLoader();

const rootNode = document.getElementById('root') as HTMLDivElement;

const root = createRoot(rootNode);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
