import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import "react-day-picker/style.css";
import { BrowserRouter } from 'react-router'
import { HeroUIProvider, ToastProvider } from "@heroui/react";

createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <ToastProvider />
    <BrowserRouter>
      <main className={"purple-dark text-foreground bg-background"}>
        <App />
      </main>
    </BrowserRouter>
  </HeroUIProvider>,
)
