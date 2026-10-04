import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import {startTelemetry} from './telemetry';
import './style.css';
void startTelemetry();
const root=document.getElementById('root')!;
const app=<React.StrictMode><App previewOnly={location.pathname==='/portfolio-preview/'}/></React.StrictMode>;
if(root.hasChildNodes()) hydrateRoot(root,app); else createRoot(root).render(app);
