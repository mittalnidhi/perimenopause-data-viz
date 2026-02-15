import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Symptomgalaxy from "./components/Symptomgalaxy";
import DIYData from "./components/DIYData";
import Colony from "./components/Colony";

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
  },
  {
    path: "/colony",
    element: <Colony />
  }
]);

export default router;
