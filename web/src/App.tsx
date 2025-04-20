import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
      <RouteManager />
    </QueryClientProvider>
  )

}

export default App
