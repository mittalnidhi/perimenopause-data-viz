import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Symptomgalaxy from "./components/Symptomgalaxy";
import DIYData from "./components/DIYData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/symptomgalaxy",
    element: <Symptomgalaxy />
  },
  {
    path: "/diydata",
    element: <DIYData />
  }
]);

export default router;
