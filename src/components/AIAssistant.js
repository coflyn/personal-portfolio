"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AIAssistant.module.css";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [githubStats, setGithubStats] = useState(null);
  const [presence, setPresence] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Coflyn's AI Companion. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  const DISCORD_ID = "601347669105049600";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    fetch("/api/chat?githubStats=true")
      .then((res) => res.json())
      .then((data) => setGithubStats(data))
      .catch(() => {});

    const fetchPresence = () => {
      fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setPresence(data.data);
        })
        .catch(() => {});
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 30000);

    const nudgeTimer = setTimeout(() => {
      if (!isOpen) setShowNudge(true);
    }, 5000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(nudgeTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  const getStatusColor = () => {
    if (!presence) return "#94a3b8";
    switch (presence.discord_status) {
      case "online":
        return "#22c55e";
      case "idle":
        return "#f59e0b";
      case "dnd":
        return "#ef4444";
      default:
        return "#94a3b8";
    }
  };

  const getStatusText = () => {
    if (!presence || presence.discord_status === "offline")
      return "Get in touch";

    const activity = presence.activities.find((a) => a.type === 0);
    if (activity) return `Active - ${activity.name}`;

    return "Active Now";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-10),
          presence: presence,
        }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: "Who is coflyn?", value: "Who is Raffi Andhika (coflyn)?" },
    {
      label: "Elaina Bot",
      value: "Tell me about Clover (Elaina Persona AI) bot.",
    },
    { label: "Downloaders", value: "What downloader tools have you built?" },
    {
      label: "Github",
      value: "Give me your GitHub profile and repository links.",
    },
    {
      label: "Get in touch",
      value: "How can I contact coflyn for collaboration?",
    },
  ];

  const handleSuggestion = (val) => {
    setInput(val);
    setTimeout(() => {
      const form = document.getElementById("ai-chat-form");
      form?.requestSubmit();
    }, 100);
  };

  const projectData = {
    clover: { path: "/projects#clover", label: "View Clover" },
    mavel: { path: "/projects#mavel", label: "View MaveL" },
    metrics: { path: "/projects#metrics", label: "View Metrics" },
    "scribdl-py": {
      path: "https://github.com/coflyn/scribdl-py",
      label: "GitHub Repo",
      external: true,
    },
    "komikudl-py": {
      path: "https://github.com/coflyn/komikudl-py",
      label: "GitHub Repo",
      external: true,
    },
    "slidesharedl-py": {
      path: "https://github.com/coflyn/slidesharedl-py",
      label: "GitHub Repo",
      external: true,
    },
    "academiadl-py": {
      path: "https://github.com/coflyn/academiadl-py",
      label: "GitHub Repo",
      external: true,
    },
    github: {
      path: "https://github.com/coflyn",
      label: "Main Profile",
      external: true,
    },
    repository: {
      path: "https://github.com/coflyn?tab=repositories",
      label: "All Repos",
      external: true,
    },
  };

  const formatLinks = (text) => {
    if (!text) return text;

    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, i) => {
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            className={styles.chatLink}
            target={linkMatch[2].startsWith("http") ? "_blank" : "_self"}
            rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : ""}
          >
            {linkMatch[1]}
          </a>
        );
      }

      const rawUrlRegex = /(https?:\/\/[^\s]+)/g;
      const subParts = part.split(rawUrlRegex);

      return subParts.map((subPart, j) => {
        if (subPart.match(rawUrlRegex)) {
          const isInternal =
            subPart.includes("coflyn.vercel.app") || subPart.startsWith("/");
          return (
            <a
              key={`${i}-${j}`}
              href={subPart}
              className={styles.chatLink}
              target={isInternal ? "_self" : "_blank"}
              rel={isInternal ? "" : "noopener noreferrer"}
            >
              {subPart}
            </a>
          );
        }
        return subPart;
      });
    });
  };

  const renderMessageContent = (content, role) => {
    if (role !== "assistant") return content;

    const lowerContent = content.toLowerCase();

    if (
      githubStats &&
      (lowerContent.includes("stats") ||
        lowerContent.includes("milestone") ||
        lowerContent.includes("total stars"))
    ) {
      return (
        <div className={styles.msgContentWrapper}>
          <div className={styles.msgText}>{formatLinks(content)}</div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{githubStats.public_repos}</span>
              <span className={styles.statLabel}>Repos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{githubStats.total_stars}</span>
              <span className={styles.statLabel}>Stars</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{githubStats.total_forks}</span>
              <span className={styles.statLabel}>Forks</span>
            </div>
          </div>
        </div>
      );
    }

    const detectedProject = Object.keys(projectData).find((key) =>
      lowerContent.includes(key),
    );

    if (detectedProject) {
      const project = projectData[detectedProject];
      return (
        <div className={styles.msgContentWrapper}>
          <div className={styles.msgText}>{formatLinks(content)}</div>
          <div className={styles.projectCard}>
            <span>
              Context Link: <strong>{detectedProject}</strong>
            </span>
            <a
              href={project.path}
              target={project.external ? "_blank" : "_self"}
              rel={project.external ? "noopener noreferrer" : ""}
              className={styles.projectLink}
            >
              {project.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      );
    }
    return <div className={styles.msgText}>{formatLinks(content)}</div>;
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowNudge(false);
  };

  return (
    <div className={styles.chatWrapper}>
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={styles.nudgeBubble}
            onClick={handleToggle}
          >
            Need help? Let's chat!
            <div className={styles.nudgeArrow} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, y: 20, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, y: 20, scale: 0.95 }
            }
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={styles.chatWindow}
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <div
                  className={styles.statusDot}
                  style={{
                    backgroundColor: getStatusColor(),
                    boxShadow: `0 0 8px ${getStatusColor()}80`,
                  }}
                />
                <h4>{getStatusText()}</h4>
              </div>
              <button className={styles.closeButton} onClick={handleToggle}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className={styles.messages} data-lenis-prevent>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    msg.role === "assistant" ? styles.ai : styles.user
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className={styles.avatarWrapper}>
                      <img
                        src="/icon.svg"
                        alt="Coflyn AI"
                        className={styles.avatar}
                      />
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    {renderMessageContent(msg.content, msg.role)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.ai}`}>
                  <div className={styles.avatarWrapper}>
                    <img
                      src="/icon.svg"
                      alt="Coflyn AI"
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.suggestions}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSuggestion(s.value)}>
                    {s.label}
                  </button>
                ))}
              </div>
              <form
                id="ai-chat-form"
                className={styles.inputArea}
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className={styles.sendButton}
                  disabled={isLoading}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`${styles.chatButton} ${isOpen ? styles.menuOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className={styles.iconContainer}>
          {/* Chat SVG Icon */}
          <motion.div
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.5 : 1,
              rotate: isOpen ? -90 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={styles.iconWrapper}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </motion.div>

          {/* Burger-style X Lines */}
          <div className={styles.burgerContainer}>
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </div>
        </div>
      </motion.button>
    </div>
  );
}
