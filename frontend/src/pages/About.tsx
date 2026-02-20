import { MyLogo } from "../assets/Logo";
import Blob from "../assets/Blob";
import styles from "./About.module.css";
import Wave from "../assets/Wave";
import { useEffect } from "react";
import Wave_end from "../assets/Wave_end";

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.storySection}`);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          } else {
            entry.target.classList.remove(styles.active);
          }
        });
      },
      { threshold: 0.35 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="container">
        <div className={styles.hero}>
          <MyLogo width={350} height={350} />
          <Blob
            id={styles.blob1}
            width={300}
            height={300}
            className={styles.heroBlob}
          />
          <Blob
            id={styles.blob2}
            width={300}
            height={300}
            className={styles.heroBlob}
          />
          <h1>Fuel the flow.</h1>
        </div>
      </div>

      <Wave id={styles.wave} width="100%" height="100%" />

      <div className={styles.page}>
        <section className={`${styles.storySection} ${styles.intro}`}>
          <div className={styles.textContent}>
            <h2 className={styles.storyText}>
              In a world that never stops moving, staying hydrated shouldn't be
              a chore - it should be your most refreshing ritual.
            </h2>
          </div>
        </section>

       
          <div className={styles.contentSection}>
             <section className={styles.storySection}>
            <Blob
              id={styles.blobContent1}
              width={200}
              height={200}
              className={styles.blobAnimated}
            />
            <div className={styles.textContent}>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <h3>Eco-Friendly</h3>
                  <p>Saying no to single-use plastics, one sip at a time.</p>
                </div>
                <div className={styles.feature}>
                  <h3>Natural Power</h3>
                  <p>Real botanicals, zero sugar, maximum hydration.</p>
                </div>
                <div className={styles.feature}>
                  <h3>Active Living</h3>
                  <p>
                    Designed to keep up with you, wherever your journey leads.
                  </p>
                </div>
              </div>
            </div>
          </section>
          </div>
        

        <section className={styles.storySection}>
          <div className={styles.textContent}>
            <h2 className={styles.storyText}>
              We think that people don't know enough about healthy way of life,
              and hydration. Our mission is to change that.
            </h2>
          </div>
        </section>
      </div>
      <Wave_end id={styles.wave_end} width="100%" height="100%" />
      <div className={styles.missionSection}>
        <div className={styles.textContent}>
          <p className={styles.missionText}>
            We created Flow for the conscious achievers: the gym-goers, the
            mountain-climbers, and the office-hustlers who refuse to compromise
            on their health or the planet's future. <br /> <br />
            By combining natural fruit extracts with sustainable,
            microplastic-free solutions, we're here to help you stay fueled,
            focused, and in the zone.{" "}
            <span style={{ fontWeight: "bolder", color: "#cc3300" }}>
              No sugar, no plastic waste—just pure, active energy.
            </span>
          </p>
        </div>
        <Blob id={styles.blob3} width={200} height={200} />
        <Blob id={styles.blob4} width={200} height={200} />
      </div>
    </>
  );
};

export default About;
