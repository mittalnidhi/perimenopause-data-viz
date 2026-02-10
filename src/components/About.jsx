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

  // Front box (percent)
  const frontBoxRef = useRef(null);
  const pctRef = useRef(null);

  // Back box (millions)
  const backBoxRef = useRef(null);
  const mRef = useRef(null);

  // Third box (billions)
  const thirdBoxRef = useRef(null);
  const bRef = useRef(null);

  useLayoutEffect(() => {
    const host = stageRef.current;
    if (!host) return;

    const ctx = gsap.context(() => {
      const PIN_SCROLL = 3600;

      // Text blocks
      const TEXT_1 =
        "Perimenopause is a<br/>Public Health Crisis.<br/>The Data is clear.";
      const TEXT_2 =
        "<span class='about__accent'>63% of Women</span> in the<br/>U.S are in Midlife.";
      const TEXT_3 =
        "At any given time,<br/>around 50 million<br/>women in the U.S are<br/>in Perimenopause";
      const TEXT_4 =
        "<span class='about__accent'>$196B</span> is lost in<br/>productivity due to<br/><span class='about__accent'>untreated symptoms</span>";

      // Segment timing (overall progress 0..1)
      const A_END = 0.45;     // % growth + early text work
      const B_START = 0.50;   // 2nd box begins
      const B_END = 0.72;
      const C_START = 0.74;   // 3rd box begins
      const C_END = 0.90;     // 3rd box finishes its main growth
      const FADE_OUT_START = 0.90; // everything fades, boxes fill screen
      const END = 1.0;

      // Numbers
      const PCT_MIN = 2;
      const PCT_MAX = 63;

      const M_MIN = 20;
      const M_MAX = 50;

      const B_MIN = 20;  // $20B
      const B_MAX = 196; // $196B

      // Helper for sizing
      const sizeFromBase = (minFrac, maxFrac, t) => {
        const base = Math.min(window.innerWidth, window.innerHeight);
        return lerp(base * minFrac, base * maxFrac, t);
      };

      // Init text
      headlineRef.current.innerHTML = TEXT_1;
      headlineRef.current.dataset.mode = "t1";
      gsap.set(headlineRef.current, { opacity: 1 });

      // Hide boxes/numbers initially (except front)
      gsap.set(backBoxRef.current, { opacity: 0 });
      gsap.set(mRef.current, { opacity: 0 });

      gsap.set(thirdBoxRef.current, { opacity: 0 });
      gsap.set(bRef.current, { opacity: 0 });

      gsap.set(frontBoxRef.current, { opacity: 1 });
      gsap.set(pctRef.current, { opacity: 1 });

      const state = { p: 0 };

      const render = (p) => {
        // -------------------------
        // A) Percent (2% -> 63%)
        // -------------------------
        const a = map01(p, 0.0, A_END);
        const pctVal = Math.round(lerp(PCT_MIN, PCT_MAX, a));
        pctRef.current.textContent = `${pctVal}%`;

        // front box grows during A
        const frontSize = sizeFromBase(0.10, 0.34, a);
        frontBoxRef.current.style.width = `${frontSize}px`;
        frontBoxRef.current.style.height = `${frontSize}px`;

        // text1 fade from 15% to 40%
        const fadeText1 = map01(pctVal, 15, 40);
        if (pctVal < 43) {
          if (headlineRef.current.dataset.mode !== "t1") {
            headlineRef.current.dataset.mode = "t1";
            headlineRef.current.innerHTML = TEXT_1;
          }
          headlineRef.current.style.opacity = `${1 - fadeText1}`;
        } else {
          // switch to text2 and fade in quickly
          if (headlineRef.current.dataset.mode !== "t2") {
            headlineRef.current.dataset.mode = "t2";
            headlineRef.current.innerHTML = TEXT_2;
          }
          const in2 = map01(pctVal, 43, 50);
          headlineRef.current.style.opacity = `${in2}`;
        }

        // -------------------------
        // B) Second box (20M -> 50M)
        // -------------------------
        const bSeg = map01(p, B_START, B_END);

        // show and grow back box
        const backOpacity = map01(p, B_START, B_START + 0.06);
        backBoxRef.current.style.opacity = `${backOpacity}`;

        const backSize = sizeFromBase(0.16, 0.52, bSeg);
        backBoxRef.current.style.width = `${backSize}px`;
        backBoxRef.current.style.height = `${backSize}px`;

        const mVal = Math.round(lerp(M_MIN, M_MAX, bSeg));
        mRef.current.textContent = `${mVal} M`;
        mRef.current.style.opacity = `${backOpacity}`;

        // During B: fade out TEXT_2 then fade in TEXT_3
        if (p >= B_START && p < C_START) {
          const out2 = map01(p, B_START, B_START + 0.12);
          const in3 = map01(p, B_START + 0.18, B_START + 0.35);

          if (out2 < 1) {
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

       
        // Third box ($20B -> $196B)
        
        const cSeg = map01(p, C_START, C_END);

        // reveal third box behind, then grow it
        const thirdOpacity = map01(p, C_START, C_START + 0.06);
        thirdBoxRef.current.style.opacity = `${thirdOpacity}`;

        const thirdSize = sizeFromBase(0.22, 0.70, cSeg);
        thirdBoxRef.current.style.width = `${thirdSize}px`;
        thirdBoxRef.current.style.height = `${thirdSize}px`;

        const bVal = Math.round(lerp(B_MIN, B_MAX, cSeg));
        bRef.current.textContent = `$${bVal} B`;
        bRef.current.style.opacity = `${thirdOpacity}`;

        // As third box starts, fade out TEXT_3.
        // Fully gone at $50B.
        // At 60% of the C segment, fade in TEXT_4.
        if (p >= C_START && p < FADE_OUT_START) {
          // Make sure we're on TEXT_3 first
          if (headlineRef.current.dataset.mode !== "t3") {
            headlineRef.current.dataset.mode = "t3";
            headlineRef.current.innerHTML = TEXT_3;
          }

          // fade out text3 from start of C until bVal hits 50
          if (cSeg < 0.60) {
              headlineRef.current.style.opacity = `${t3Opacity}`; // still on text3 fading out
            } else {
              // switch to text4
              if (headlineRef.current.dataset.mode !== "t4") {
                headlineRef.current.dataset.mode = "t4";
                headlineRef.current.innerHTML = TEXT_4;
              }

              // 1) fade IN text4 quickly (0.60 -> 0.70 of cSeg)
              const t4In = map01(cSeg, 0.60, 0.70);

              // 2) HOLD text4 fully visible until $193B
              // 3) then fade OUT only after $193B (193 -> 196)
              const after193 = map01(bVal, 193, 196); // 0 until 193, then 0..1
              const t4HoldThenOut = 1 - after193;

              // combine: must have faded in, then held, then fades out after 193
              const t4Opacity = Math.min(1, t4In) * t4HoldThenOut;

              headlineRef.current.style.opacity = `${t4Opacity}`;
            }
        }

        // -------------------------
        // Final: fade all text/numbers
        // Boxes fill the screen red
        // -------------------------
        const finalT = map01(p, FADE_OUT_START, END);
        const fadeAll = 1 - finalT;

        // Fade headline + all numeric labels
        headlineRef.current.style.opacity = `${parseFloat(headlineRef.current.style.opacity || "1") * fadeAll}`;
        pctRef.current.style.opacity = `${fadeAll}`;
        mRef.current.style.opacity = `${fadeAll}`;
        bRef.current.style.opacity = `${fadeAll}`;

        // Push boxes to full-screen at the end
        // (Grow all three to exceed viewport so it becomes a solid red field)
        if (p >= FADE_OUT_START) {
          const huge = Math.max(window.innerWidth, window.innerHeight) * 1.6;

          const frontHuge = lerp(parseFloat(frontBoxRef.current.style.width || "0") || huge, huge, finalT);
          frontBoxRef.current.style.width = `${frontHuge}px`;
          frontBoxRef.current.style.height = `${frontHuge}px`;

          const backHuge = lerp(parseFloat(backBoxRef.current.style.width || "0") || huge, huge, finalT);
          backBoxRef.current.style.width = `${backHuge}px`;
          backBoxRef.current.style.height = `${backHuge}px`;
          backBoxRef.current.style.opacity = `1`;

          const thirdHuge = lerp(parseFloat(thirdBoxRef.current.style.width || "0") || huge, huge, finalT);
          thirdBoxRef.current.style.width = `${thirdHuge}px`;
          thirdBoxRef.current.style.height = `${thirdHuge}px`;
          thirdBoxRef.current.style.opacity = `1`;
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
          snapTo: [0, A_END, B_START, B_END, C_START, C_END, 1],
          duration: 0.6,
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

        {/* THIRD box (backmost): $20B -> $196B */}
        <div ref={thirdBoxRef} className="about__box about__box--third">
          <div ref={bRef} className="about__num about__num--b">
            $20 B
          </div>
        </div>

        {/* back box: 20M -> 50M */}
        <div ref={backBoxRef} className="about__box about__box--back">
          <div ref={mRef} className="about__num about__num--m">
            20 M
          </div>
        </div>

        {/* front box: 2% -> 63% */}
        <div ref={frontBoxRef} className="about__box about__box--front">
          <div ref={pctRef} className="about__num about__num--pct">
            2%
          </div>
        </div>
      </div>
    </div>
  );
}
