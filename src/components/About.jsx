// About.jsx
import React, { forwardRef, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.css";

gsap.registerPlugin(ScrollTrigger);

const About = forwardRef(function About(
  { onEnterAbout, onLeaveAbout },
  ref
) {
  const aboutHeadlineRef = useRef(null);
  const aboutSubRef = useRef(null);
  const redBoxRef = useRef(null);
  const redBoxNumberRef = useRef(null);

  useLayoutEffect(() => {
    const sectionEl =
      typeof ref === "function" ? null : ref?.current;

    // If parent passed a ref, we use it. Otherwise fallback to local query
    const triggerEl =
      sectionEl || document.getElementById("about");

    if (!triggerEl) return;

    const ctx = gsap.context(() => {
      const PIN_SCROLL = 1600;

      const state = { p: 0 }; // 0..1
      const minPct = 2;
      const maxPct = 63;
      const switchAt = 43;

      const computeBoxSize = (p) => {
        const min = Math.min(window.innerWidth, window.innerHeight) * 0.14;
        const max = Math.min(window.innerWidth, window.innerHeight) * 0.42;
        return min + (max - min) * p;
      };

      const updateUI = (p) => {
        const val = Math.round(minPct + (maxPct - minPct) * p);

        if (redBoxNumberRef.current) {
          redBoxNumberRef.current.textContent = `${val}%`;
        }

        if (aboutHeadlineRef.current && aboutSubRef.current) {
          if (val >= switchAt) {
            // Text changes at 43% (position stays the same)
            aboutHeadlineRef.current.innerHTML =
              `<span class="accent">63% of Women</span> in the<br/>U.S are in Midlife.`;
            aboutSubRef.current.textContent = "";
          } else {
            aboutHeadlineRef.current.innerHTML =
              `Perimenopause is a<br/>Public Health Crisis.<br/>The Data is clear.`;
            aboutSubRef.current.textContent = "";
          }
        }

        const size = computeBoxSize(p);
        if (redBoxRef.current) {
          redBoxRef.current.style.width = `${size}px`;
          redBoxRef.current.style.height = `${size}px`;
        }
      };

      // init
      updateUI(0);

      gsap.to(state, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: `+=${PIN_SCROLL}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,

          // continuous snap inside About
          snap: {
            snapTo: [
              0,
              (switchAt - minPct) / (maxPct - minPct), // progress at 43%
              1,
            ],
            duration: 0.45,
            delay: 0.02,
            ease: "power2.inOut",
          },

          onEnter: () => onEnterAbout?.(),
          onEnterBack: () => onEnterAbout?.(),
          onLeave: () => onLeaveAbout?.(),
          onLeaveBack: () => onLeaveAbout?.(),

          onUpdate: () => updateUI(state.p),
        },
        onUpdate: () => updateUI(state.p),
      });

      // keep responsive on resize
      const onResize = () => updateUI(state.p);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, triggerEl);

    return () => ctx.revert();
  }, [ref, onEnterAbout, onLeaveAbout]);

  return (
    <section ref={ref} className="section aboutSection" id="about">
      <div className="aboutStage">
        <div className="leftDots" aria-hidden="true">
          <span className="leftDot" />
          <span className="leftDot isOn" />
          <span className="leftDot" />
        </div>

        <div className="aboutCopy">
          <h2 ref={aboutHeadlineRef} className="aboutHeadline">
            Perimenopause is a
            <br />
            Public Health Crisis.
            <br />
            The Data is clear.
          </h2>
          <div ref={aboutSubRef} className="aboutSub" />
        </div>

        <div ref={redBoxRef} className="redBox" aria-hidden="true">
          <div ref={redBoxNumberRef} className="redBoxNumber">
            2%
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
