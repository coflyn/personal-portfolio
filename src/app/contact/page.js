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
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Makassar",
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

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
            <ScrollReveal delay={0.15}>
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
                  <button
                    className={`${styles.tabBtn} ${activeTab === "status" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("status")}
                  >
                    Status
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

                    {activeTab === "status" && (
                      <motion.div
                        key="status"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={styles.statusTab}
                      >
                        <div className={styles.statusItem}>
                          <span className={styles.statusLabel}>
                            Availability
                          </span>
                          <div className={styles.availabilityBox}>
                            <div className={styles.pulse} />
                            <span className={styles.availabilityText}>
                              Available for Projects
                            </span>
                          </div>
                        </div>

                        <div className={styles.statusItem}>
                          <span className={styles.statusLabel}>Local Time</span>
                          <span className={styles.statusValue}>
                            {currentTime} (GMT+8)
                          </span>
                        </div>

                        <div className={styles.statusItem}>
                          <span className={styles.statusLabel}>Location</span>
                          <span className={styles.statusValue}>
                            Makassar, Indonesia
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
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
                        disabled={status === "sending"}
                        className={`${styles.submitBtn} ${
                          status === "success" ? styles.success : ""
                        }`}
                      >
                        {status === "idle" && "Send Message"}
                        {status === "sending" && "Sending..."}
                        {status === "success" && "Message Sent!"}
                        {status === "error" && "Error! Try again"}
                      </button>
                    </MagneticButton>

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
    </PageTransition>
  );
}
