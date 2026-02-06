import GhostChart from "./GhostChart";
import StatsSection from "./StatsSection";
import "./Home.css";

export default function Home() {
  return (
    <main>

      <section className="hero">
        <GhostChart />

        <h1>The Invisible Data</h1>

        <p>
          Mapping the Perimenopausal Data Gap<br />
          in Women’s Health
        </p>
      </section>

      <StatsSection />

    </main>
  );
}
