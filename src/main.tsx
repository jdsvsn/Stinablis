import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance Optimizations
gsap.ticker.lagSmoothing(500, 33);
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.defaults({ 
  fastScrollEnd: true,
  invalidateOnRefresh: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
