"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import styles from "./page.module.css";

const socials = [
  { name: "Instagram", href: "https://instagram.com/_coflyn" },
  { name: "GitHub", href: "https://github.com/coflyn" },
  { name: "Email", href: "mailto:riazrepo@gmail.com" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const subject = `Collaboration Inquiry from ${formData.name}`;
  const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
  
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=riazrepo@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:riazrepo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  const finalUrl = isMobile ? mailtoUrl : gmailUrl;

  return (
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
                  {socials.map((social) => {
                    // Apply same device-aware logic for the social Email link
                    let href = social.href;
                    if (social.name === "Email") {
                      const desktopGmail = "https://mail.google.com/mail/?view=cm&fs=1&to=riazrepo@gmail.com";
                      const mobileMailto = "mailto:riazrepo@gmail.com";
                      href = isMobile ? mobileMailto : desktopGmail;
                    }

                    return (
                      <a
                        key={social.name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialItem}
                      >
                        <span className={styles.socialName}>{social.name}</span>
                        <span className={styles.socialArrow}>↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className={styles.formSide}>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder=" " 
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="name">Name</label>
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder=" " 
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className={styles.inputGroup}>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder=" "
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>

                  <MagneticButton>
                    <a 
                      href={finalUrl}
                      target={isMobile ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className={styles.submitBtn}
                      style={{ display: 'inline-block', textAlign: 'center' }}
                    >
                      Send Message
                    </a>
                  </MagneticButton>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
