import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

export default function App() {

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <RouterProvider router={router} />;
}
