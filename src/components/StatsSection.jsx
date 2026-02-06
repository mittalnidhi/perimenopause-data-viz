import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./StatsSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const section = useRef();
  const box = useRef();
  const number = useRef();
  const textOne = useRef();
  const textTwo = useRef();

  useEffect(() => {

    const obj = { val: 5 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true
      }
    });

    // Counter
    tl.to(obj, {
      val: 63,
      onUpdate: () => {
        number.current.innerHTML = `${Math.round(obj.val)}%`;
      }
    }, 0);

    // Box growth
    tl.fromTo(box.current,
      { scale: 0.4 },
      { scale: 1 },
      0
    );

    // First text fades OUT between 45–58
    tl.to(textOne.current, {
      opacity: 0
    }, 0.55);

    // Second text fades IN at 58+
    tl.fromTo(textTwo.current,
      { opacity: 0 },
      { opacity: 1 },
      0.6
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());

  }, []);

  return (
    <section ref={section} className="stats-section">

      <div className="stats-text">

        <div ref={textOne} className="text-layer">
          Perimenopause is a <br/> Public Health Crisis.<br/>
          The Data is Clear.
        </div>

        <div ref={textTwo} className="text-layer second">
          According to U.S Census Bureau,
          about 63% Women are in Midlife.
        </div>

      </div>
    
    // change the % numb inside the box
      <div ref={box} className="stats-box">
        <span ref={number}>5%</span>
      </div>

    </section>
  );
}
