import { Toaster } from "react-hot-toast";
import { RouteManager } from "./routes/routes";
import { MainNavBar } from "./components/navbar/main-navbar";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";

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
    <div className="bg-[url(/public/bg.png)] bg-no-repeat bg-center h-screen justify-center items-center">
      <MainNavBar />
      <RouteManager />
      <Toaster />
    </div>
  )

}

export default App
