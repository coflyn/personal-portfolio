"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import styles from "./page.module.css";

const socials = [
  { name: "WhatsApp", href: "https://wa.me/6282399408885" },
  { name: "Instagram", href: "https://instagram.com/_coflyn" },
  { name: "GitHub", href: "https://github.com/coflyn" },
  { name: "Email", href: "mailto:riazrepo@gmail.com" },
];

const faqs = [
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes! I'm currently open to new opportunities and freelance projects. Whether you have a small project or a long-term collaboration, feel free to reach out.",
  },
  {
    question: "What is your typical response time?",
    answer:
      "I usually respond within 24 hours. For faster communication, you can reach me via WhatsApp during business hours.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. I've worked with clients across different time zones and I'm comfortable communicating in English for project discussions.",
  },
  {
    question: "What services do you offer?",
    answer:
      "I specialize in Custom Web Development (Next.js, React), Discord Bot Automation, and Performance Optimization for existing web applications.",
  },
  {
    question: "Do you provide maintenance and support?",
    answer:
      "Yes! Every project includes a period of free post-launch support to ensure everything runs smoothly and to fix any unexpected bugs.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const lastSent = localStorage.getItem("last_email_sent");
    if (lastSent) {
      const now = Date.now();
      const diff = now - parseInt(lastSent);
      const COOLDOWN_TIME = 60 * 60 * 1000;
      if (diff < COOLDOWN_TIME) {
        setCooldown(Math.ceil((COOLDOWN_TIME - diff) / 1000));
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) {
      setErrorMsg(`Please wait ${formatCooldown(cooldown)} before sending another message.`);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        localStorage.setItem("last_email_sent", Date.now().toString());
        setCooldown(60 * 60);
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setErrorMsg(data.error || "Failed to send message.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMsg("Network error. Please check your connection.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    
      <main className={styles.page}>
        <div className="container">
          <ScrollReveal 
            delay={0.1}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <div className={styles.header}>
              <p className="section-label">Contact</p>
              <h1 className="section-title">Let&apos;s work together.</h1>
            </div>
          </ScrollReveal>

          <div className={styles.content}>
            <ScrollReveal 
              delay={0.3}
              variants={{
                hidden: { opacity: 0, y: 40, skewY: 2 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  skewY: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              <div className={styles.infoSide}>
                <div className={styles.tabHeader}>
                  <button
                    className={`${styles.tabBtn} ${activeTab === "info" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("info")}
                  >
                    Connect
                  </button>
                  <button
                    className={`${styles.tabBtn} ${activeTab === "faq" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("faq")}
                  >
                    FAQ
                  </button>
                </div>

                <div className={styles.tabContent}>
                  <AnimatePresence mode="wait">
                    {activeTab === "info" && (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.text}>
                          <p>
                            Got a project idea, collaboration proposal, or just
                            want to say hello? Feel free to reach out. I&apos;m
                            always open to interesting conversations and
                            opportunities.
                          </p>
                        </div>

                        <div className={styles.socials}>
                          {socials.map((social) => {
                            let href = social.href;
                            if (social.name === "Email") {
                              const desktopGmail =
                                "https://mail.google.com/mail/?view=cm&fs=1&to=riazrepo@gmail.com";
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
                                <span className={styles.socialName}>
                                  {social.name}
                                </span>
                                <span className={styles.socialArrow}>↗</span>
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "faq" && (
                      <motion.div
                        key="faq"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className={styles.faqSection}
                      >
                        <h3 className={styles.faqHeader}>Frequently Asked</h3>
                        <div className={styles.faqList}>
                          {faqs.map((faq, index) => (
                            <div
                              key={index}
                              className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""}`}
                            >
                              <button
                                className={styles.faqQuestion}
                                onClick={() =>
                                  setActiveFaq(
                                    activeFaq === index ? null : index,
                                  )
                                }
                                type="button"
                              >
                                <span>{faq.question}</span>
                                <span className={styles.faqIcon}>
                                  {activeFaq === index ? "−" : "+"}
                                </span>
                              </button>
                              <AnimatePresence initial={false}>
                                {activeFaq === index && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: [0.25, 1, 0.5, 1],
                                    }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <div className={styles.faqAnswer}>
                                      <p>{faq.answer}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              delay={0.5}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              <div className={styles.formSide}>
                <form className={styles.form} onSubmit={handleSubmit}>
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

                  <div className={styles.btnWrapper}>
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={status === "sending" || cooldown > 0}
                        className={`${styles.submitBtn} ${
                          status === "success" ? styles.success : ""
                        } ${cooldown > 0 ? styles.disabled : ""}`}
                      >
                        {status === "idle" && "Send Message"}
                        {status === "sending" && "Sending..."}
                        {status === "success" && "Message Sent!"}
                        {status === "error" && "Error! Try again"}
                      </button>
                    </MagneticButton>

                    {status === "error" && errorMsg && (
                      <p className={styles.errorMsg}>{errorMsg}</p>
                    )}

                    {cooldown > 0 && status === "idle" && (
                      <p className={styles.infoMsg}>
                        You can send another message in {formatCooldown(cooldown)}.
                      </p>
                    )}

                    {status === "success" && (
                      <p className={styles.successMsg}>
                        Thanks! I'll get back to you soon.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    
  );
}
