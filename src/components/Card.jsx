import React from 'react'
import Navbar from './Navbar'

const Card = () => {
  // Defining arrays for each section
  const filterSymptoms = [
    "Psychological",
    "Emotional",
    "Cognitive",
    "Sexual",
    "Urological",
    "Menstrual",
    "Dermatological",
    "Sensory",
    "Vasomotor",
    "Sleep & Fatigue",
    "Physical",
  ];
  const viewSymptoms = ["Initial", "Worst", "Least Common", "Most Discussed"];

  const perimenopausePhases = ["Initial", "Mid", "Late"];

  // Grouping sections into an array so that its easier to map
  const sections = [
    { title: "Filter Symptom", buttons: filterSymptoms },
    { title: "View Symptom", buttons: viewSymptoms },
    { title: "Perimenopause Phase", buttons: perimenopausePhases },
  ];

  return (
    <div className="card-wrapper">
      <div className="Card">
        {/* Map through sections */}
        {sections.map((section) => (
          <section className="section" key={section.title}>
            <h2>{section.title}</h2>
            <div className="button-group">
              {section.buttons.map((btn) => (
                <button key={btn}>{btn}</button>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <div className="footer">
          <span>* Click on the buttons to learn more</span>
          <span>• Hover over the colored dots to learn more</span>
        </div>
      </div>
    </div>
  );
};

export default Card
