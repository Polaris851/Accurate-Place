import { createRoot } from 'react-dom/client'
import App from './App'
import  './index.css'
import "react-day-picker/style.css";
import { BrowserRouter } from 'react-router'
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HeroUIProvider>,
)
