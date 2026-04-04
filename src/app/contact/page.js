"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import styles from "./page.module.css";

const socials = [
  { name: "Instagram", href: "https://instagram.com/_coflyn" },
  { name: "GitHub", href: "https://github.com/coflyn" },
  { name: "Email", href: "mailto:riazrepo@gmail.com" },
];

export default function Contact() {
  return (
    <SmoothScroll>
      <Navbar />
      <PageTransition>
        <main className={styles.page}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.header}>
                <p className="section-label">Contact</p>
                <h1 className="section-title">Let&apos;s work together.</h1>
              </div>
            </ScrollReveal>

            <div className={styles.content}>
              <ScrollReveal>
                <div className={styles.infoSide}>
                  <div className={styles.text}>
                    <p>
                      Got a project idea, collaboration proposal, or just want
                      to say hello? Feel free to reach out. I&apos;m always open
                      to interesting conversations and opportunities.
                    </p>
                  </div>

                  <div className={styles.socials}>
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialItem}
                      >
                        <span className={styles.socialName}>{social.name}</span>
                        <span className={styles.socialArrow}>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className={styles.formSide}>
                  <form
                    className={styles.form}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className={styles.inputGroup}>
                      <input type="text" id="name" required placeholder=" " />
                      <label htmlFor="name">Name</label>
                    </div>

                    <div className={styles.inputGroup}>
                      <input type="email" id="email" required placeholder=" " />
                      <label htmlFor="email">Email</label>
                    </div>

                    <div className={styles.inputGroup}>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder=" "
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>

                    <MagneticButton>
                      <button type="submit" className={styles.submitBtn}>
                        Send Message
                      </button>
                    </MagneticButton>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </SmoothScroll>
  );
}
