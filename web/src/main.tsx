import { createRoot } from 'react-dom/client'
import App from './App'
import  './index.css'
import "react-day-picker/style.css";
import { BrowserRouter } from 'react-router'
import { Button, HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
  <BrowserRouter>
    <Button color={"primary"}>teste</Button>
    <App />
  </BrowserRouter>
  </HeroUIProvider>,
)
