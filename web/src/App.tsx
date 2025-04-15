import { Toaster } from "react-hot-toast";
import { RouteManager } from "./routes";
import { MainNavBar } from "./components/navbar/main-navbar";

function App() {

  return (
    <div className="bg-[url(/public/bg.png)] bg-no-repeat bg-center h-screen justify-center items-center">
      <MainNavBar />
      <RouteManager />
      <Toaster />
    </div>
  )

}

export default App
