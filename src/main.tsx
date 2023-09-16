import './index.scss';
import App from './App';
import { createRoot } from 'react-dom/client';
import { initLoader } from './utils/initLoader';
import { BrowserRouter } from 'react-router-dom';

initLoader();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
