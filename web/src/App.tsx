import { Toaster } from "react-hot-toast";
import { RouteManager } from "./routes";
import { MainNavBar } from "./components/navbar/main-navbar";

function App() {

  return (
    <>
      <MainNavBar />
      <RouteManager />
      <Toaster />
    </>
  )

}

export default App
