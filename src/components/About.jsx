// About.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const map01 = (v, inMin, inMax) => clamp01((v - inMin) / (inMax - inMin));

export default function About() {
  const stageRef = useRef(null);
  const headlineRef = useRef(null);

  const frontBoxRef = useRef(null);
  const pctRef = useRef(null);

  const backBoxRef = useRef(null);
  const mRef = useRef(null);

  useLayoutEffect(() => {
    const host = stageRef.current;
    if (!host) return;

    const ctx = gsap.context(() => {
      const PIN_SCROLL = 2600;

      const TEXT_1 =
        "Perimenopause is a<br/>Public Health Crisis.<br/>The Data is clear.";
      const TEXT_2 =
        "<span class='about__accent'>63% of Women</span> in the<br/>U.S are in Midlife.";
      const TEXT_3 =
        "At any given time,<br/>around 50 million<br/>women in the U.S are<br/>in Perimenopause";

      headlineRef.current.innerHTML = TEXT_1;

      gsap.set(backBoxRef.current, { opacity: 0 });

      const state = { p: 0 };

      const computeSize = (minPct, maxPct, t) => {
        const base = Math.min(window.innerWidth, window.innerHeight);
        return lerp(base * minPct, base * maxPct, t);
      };

      const render = (p) => {
        // 0..1 timeline progress
        const pctProgress = map01(p, 0.0, 0.58);
        const pctVal = Math.round(lerp(2, 63, pctProgress));
        pctRef.current.textContent = `${pctVal}%`;

        // grow front box during % segment
        const frontSize = computeSize(0.10, 0.34, pctProgress);
        frontBoxRef.current.style.width = `${frontSize}px`;
        frontBoxRef.current.style.height = `${frontSize}px`;

        // text 1 fade 15 -> 40
        const fade1 = map01(pctVal, 15, 40);
        // swap to text 2 at 43
        if (pctVal < 43) {
          if (headlineRef.current.dataset.mode !== "t1") {
            headlineRef.current.dataset.mode = "t1";
            headlineRef.current.innerHTML = TEXT_1;
          }
          headlineRef.current.style.opacity = `${1 - fade1}`;
        } else {
          if (headlineRef.current.dataset.mode !== "t2") {
            headlineRef.current.dataset.mode = "t2";
            headlineRef.current.innerHTML = TEXT_2;
          }
          const in2 = map01(pctVal, 43, 50);
          headlineRef.current.style.opacity = `${in2}`;
        }

        // back box segment
        const backStart = 0.62;
        const backProg = map01(p, backStart, 1.0);

        // show back box
        const backOpacity = map01(p, backStart, backStart + 0.06);
        backBoxRef.current.style.opacity = `${backOpacity}`;

        // grow back box (bigger, behind)
        const backSize = computeSize(0.16, 0.52, backProg);
        backBoxRef.current.style.width = `${backSize}px`;
        backBoxRef.current.style.height = `${backSize}px`;

        // 20M -> 50M
        const mVal = Math.round(lerp(20, 50, backProg));
        mRef.current.textContent = `${mVal} M`;
        mRef.current.style.opacity = `${backOpacity}`;

        // fade out text 2, then show text 3
        if (p >= backStart) {
          const out2 = map01(p, backStart, backStart + 0.12);
          const in3 = map01(p, backStart + 0.18, backStart + 0.35);

          if (out2 < 1) {
            // ensure text2
            if (headlineRef.current.dataset.mode !== "t2") {
              headlineRef.current.dataset.mode = "t2";
              headlineRef.current.innerHTML = TEXT_2;
            }
            headlineRef.current.style.opacity = `${1 - out2}`;
          } else {
            if (headlineRef.current.dataset.mode !== "t3") {
              headlineRef.current.dataset.mode = "t3";
              headlineRef.current.innerHTML = TEXT_3;
            }
            headlineRef.current.style.opacity = `${in3}`;
          }
        }
      };
      

      render(0);

      ScrollTrigger.create({
        trigger: host,
        start: "top top",
        end: `+=${PIN_SCROLL}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: [0, 0.34, 0.58, 0.62, 1],
          duration: 0.55,
          delay: 0.02,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          state.p = self.progress;
          render(state.p);
        },
      });

      const onResize = () => render(state.p);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, host);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about">
      <div ref={stageRef} className="about__stage">
        {/* left dots */}
        <div className="about__leftDots" aria-hidden="true">
          <span className="about__dot" />
          <span className="about__dot about__dot--on" />
          <span className="about__dot" />
        </div>

        {/* headline */}
        <div className="about__copy">
          <h2 ref={headlineRef} className="about__headline" />
        </div>

        {/* back box */}
        <div ref={backBoxRef} className="about__box about__box--back">
          <div ref={mRef} className="about__num about__num--m">
            20 M
          </div>
        </div>

        {/* front box */}
        <div ref={frontBoxRef} className="about__box about__box--front">
          <div ref={pctRef} className="about__num about__num--pct">
            2%
          </div>
        </div>
      </div>
    </div>
  );
}
