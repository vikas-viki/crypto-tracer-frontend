import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import State from './context/State.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <State>
      <App />
    </State>
  </StrictMode>,
)
