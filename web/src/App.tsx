import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MainNavBar } from "./components/navbar/main-navbar";
import { api } from "./lib/axios";
import { queryClient } from "./lib/query-client";
import { RouteManager } from "./routes/routes";

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[url(/public/bg.png)] bg-no-repeat bg-center h-screen justify-center items-center">
        <MainNavBar />
        <RouteManager />
      </div>
    </QueryClientProvider>
  )

}

export default App
