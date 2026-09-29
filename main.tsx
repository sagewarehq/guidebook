import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Site } from './site/Site';
import './styles/tokens.css';
import './site/site.css';
import './site/mock.css';

createRoot(document.getElementById('root')!).render(<StrictMode><Site /></StrictMode>);
