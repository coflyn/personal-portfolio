"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import styles from "./AIAssistant.module.css";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [githubStats, setGithubStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [presence, setPresence] = useState(null);
  const initialMessage = {
    role: "assistant",
    content:
      "Hi! I'm Coflyn's AI Companion. How can I help you today? You can ask about coflyn or anything.",
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [vpHeight, setVpHeight] = useState("100dvh");
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const saved = localStorage.getItem("coflyn_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1 || messages[0].content !== initialMessage.content) {
      localStorage.setItem("coflyn_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([initialMessage]);
    localStorage.removeItem("coflyn_chat_history");
    setShowClearConfirm(false);
  };

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  const DISCORD_ID = "601347669105049600";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    fetch("/api/chat?githubStats=true")
      .then((res) => res.json())
      .then((data) => {
        setGithubStats(data.stats);

        const fetchedRepos = (data.projects || []).map((repo) => ({
          ...repo,
          priority: 10,
        }));

        const signatureLinks = [
          {
            title: "Personal Portfolio",
            github_url: "https://github.com/coflyn/personal-portfolio",
            priority: 8,
          },
          {
            title: "GitHub Profile",
            github_url: "https://github.com/coflyn",
            priority: 1,
            isSignature: true,
          },
        ];

        setProjects([...fetchedRepos, ...signatureLinks]);
      })
      .catch((err) => console.error("Chat info fetch error:", err));

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

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleViewportChange = () => {
      if (window.visualViewport) {
        setVpHeight(`${window.visualViewport.height}px`);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
      window.visualViewport.addEventListener("scroll", handleViewportChange);
      handleViewportChange();
    }

    return () => {
      document.body.style.overflow = "";
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange,
        );
        window.visualViewport.removeEventListener(
          "scroll",
          handleViewportChange,
        );
      }
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    const nudgeTimer = setTimeout(() => {
      const hasSeenNudge = sessionStorage.getItem("hasSeenAInudge");
      if (!isOpenRef.current && !hasSeenNudge) {
        setShowNudge(true);
        sessionStorage.setItem("hasSeenAInudge", "true");
      }
    }, 5000);

    return () => clearTimeout(nudgeTimer);
  }, []);

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
    isAutoScrolling.current = true;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 800);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamBufferRef = useRef("");
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    if (isStreaming) {
      if (typingIntervalRef.current) return;

      typingIntervalRef.current = setInterval(() => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];

          if (
            lastMsg &&
            lastMsg.role === "assistant" &&
            lastMsg.content.length < streamBufferRef.current.length
          ) {
            const buffer = streamBufferRef.current;
            const currentPos = lastMsg.content.length;
            const diff = buffer.length - currentPos;

            let step = diff > 50 ? 3 : 1;

            if (step > 1) {
              const lookAhead = buffer.slice(currentPos, currentPos + step);
              if (/[\[*`#]/.test(lookAhead)) {
                step = 1;
              }
            }

            const nextChar = buffer[currentPos];

            if (nextChar === "[") {
              const midPattern = buffer.indexOf("](", currentPos);
              const closingParen = buffer.indexOf(")", midPattern);
              if (midPattern !== -1 && closingParen !== -1) {
                step = closingParen + 1 - currentPos;
              } else {
                return prev;
              }
            } else if (nextChar === "*") {
              const isBold = buffer[currentPos + 1] === "*";
              const symbol = isBold ? "**" : "*";
              const closingIdx = buffer.indexOf(
                symbol,
                currentPos + (isBold ? 2 : 1),
              );
              if (closingIdx !== -1) {
                step = closingIdx + symbol.length - currentPos;
              } else {
                return prev;
              }
            } else if (nextChar === "`") {
              const closingIdx = buffer.indexOf("`", currentPos + 1);
              if (closingIdx !== -1 && buffer[currentPos + 1] !== "`") {
                step = closingIdx + 1 - currentPos;
              } else if (buffer[currentPos + 1] !== "`") {
                return prev;
              }
            } else if (
              nextChar === "#" &&
              (currentPos === 0 || buffer[currentPos - 1] === "\n")
            ) {
              const spaceIdx = buffer.indexOf(" ", currentPos);
              if (spaceIdx !== -1 && spaceIdx - currentPos < 6) {
                step = spaceIdx + 1 - currentPos;
              } else {
                if (buffer.slice(currentPos, currentPos + 6).includes(" ")) {
                } else {
                  if (buffer.length - currentPos < 6) return prev;
                }
              }
            }

            updated[updated.length - 1] = {
              ...lastMsg,
              content: buffer.slice(0, currentPos + step),
            };
            return updated;
          }
          return prev;
        });
      }, 55);
    } else {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [isStreaming]);

  const sendMessage = async (messageText) => {
    const content = messageText || input;
    if (!content.trim() || isLoading) return;

    const userMessage = { role: "user", content: content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!messageText) setInput("");
    setIsLoading(true);
    streamBufferRef.current = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-10),
          presence: presence,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            "I'm experiencing some connectivity issues. Please try again later.",
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsLoading(false);
      setIsStreaming(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamBufferRef.current += chunk;
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.message ||
            "Sorry, I'm experiencing some connectivity issues. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      const checkFinished = setInterval(() => {
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (
            lastMsg &&
            lastMsg.content.length >= streamBufferRef.current.length
          ) {
            setIsStreaming(false);
            clearInterval(checkFinished);
          }
          return prev;
        });
      }, 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const suggestions = [
    { label: "Who is coflyn?", value: "Who is Dika (coflyn)?" },
    {
      label: "Tech Stack",
      value: "What technologies do you use for development?",
    },
    { label: "Games", value: "What games are you currently playing?" },
    {
      label: "Freelance Status",
      value: "Are you available for freelance projects?",
    },
    { label: "Education", value: "Tell me about your education background." },
    {
      label: "Latest Project",
      value: "What is your latest project on GitHub?",
    },
    {
      label: "Contact Info",
      value: "How can I get in touch with you for collaboration?",
    },
  ];

  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const scrollRef = useRef(null);
  const isAutoScrolling = useRef(false);

  const handleScroll = (e) => {
    if (isAutoScrolling.current) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 150);
  };
  const handleSuggestion = (val) => {
    sendMessage(val);
  };

  const findProjectInText = (text) => {
    if (!projects || projects.length === 0) return null;
    const lowerText = text.toLowerCase();

    const scoredMatches = projects
      .map((p) => {
        const title = p.title.toLowerCase();

        if (title === "github profile" && !lowerText.includes("profile"))
          return { project: p, score: 0 };

        if (lowerText.includes(title))
          return { project: p, score: 10 + title.length };

        if (
          title.length > 3 &&
          (title.includes(lowerText) || lowerText.includes(title))
        ) {
          return { project: p, score: 5 + title.length };
        }

        return { project: p, score: 0 };
      })
      .filter((m) => m.score > 0);

    if (scoredMatches.length === 0) return null;

    return scoredMatches.sort((a, b) => {
      if (b.project.priority !== a.project.priority)
        return b.project.priority - a.project.priority;
      return b.score - a.score;
    })[0].project;
  };

  const MarkdownBody = ({ content }) => {
    const autoLinked = content.replace(
      /(?<!\()https?:\/\/[^\s\)]+/g,
      (url) => `[${url}](${url})`,
    );
    const formatted = autoLinked.replace(/\n(?!\n)/g, "\n\n");

    return (
      <div className={styles.msgText}>
        <ReactMarkdown>{formatted}</ReactMarkdown>
      </div>
    );
  };

  const renderMessageContent = (content, role) => {
    if (role !== "assistant") return <MarkdownBody content={content} />;

    const lowerContent = content.toLowerCase();

    const hasStats =
      githubStats &&
      (lowerContent.includes("stats") ||
        lowerContent.includes("milestone") ||
        lowerContent.includes("total stars") ||
        lowerContent.includes("statistik"));

    const project = findProjectInText(content);

    return (
      <div className={styles.msgContentWrapper}>
        <MarkdownBody content={content} />

        {hasStats && content.length > 15 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.statsGrid}
          >
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
          </motion.div>
        )}

        {project && content.length > 15 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.projectCard}
          >
            <span>
              Context Link: <strong>{project.title}</strong>
            </span>
            <a
              href={
                project.github_url ||
                project.path ||
                `https://github.com/coflyn/${project.title}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              View Repository
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
          </motion.div>
        )}
      </div>
    );
  };

  const handleToggle = () => {
    if (!isOpen) {
      setShowNudge(false);
      sessionStorage.setItem("hasSeenAInudge", "true");
    }
    setIsOpen(!isOpen);
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
            transition={
              isMobile
                ? { type: "tween", duration: 0.36, ease: [0.23, 1, 0.32, 1] }
                : { type: "spring", damping: 28, stiffness: 220 }
            }
            className={styles.chatWindow}
            style={isMobile ? { height: vpHeight, top: 0, bottom: "auto" } : {}}
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
              <div className={styles.headerActions}>
                <button
                  className={styles.resetButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowClearConfirm(true);
                  }}
                  title="Clear conversation"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
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
            </div>

            <div className={styles.messagesWrapper}>
              <div
                className={styles.messages}
                style={{
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                }}
                data-lenis-prevent
                onScroll={handleScroll}
                ref={scrollRef}
              >
                <div className={styles.messagesContainer}>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`${styles.message} ${
                        msg.role === "user" ? styles.user : styles.ai
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div
                          className={`${styles.avatarWrapper} ${isStreaming && idx === messages.length - 1 && msg.content.length < 10 ? styles.loadingAvatar : ""}`}
                        >
                          <img
                            src="/icon.svg"
                            alt="Coflyn AI"
                            className={styles.avatar}
                          />
                        </div>
                      )}
                      <div
                        className={`${styles.messageContent} ${
                          isStreaming && idx === messages.length - 1
                            ? styles.streaming
                            : ""
                        } ${
                          isStreaming &&
                          idx === messages.length - 1 &&
                          msg.content.length < 5
                            ? styles.shortStream
                            : ""
                        }`}
                      >
                        {renderMessageContent(msg.content, msg.role)}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className={`${styles.message} ${styles.ai}`}>
                      <div
                        className={`${styles.avatarWrapper} ${styles.loadingAvatar}`}
                      >
                        <img
                          src="/icon.svg"
                          alt="Coflyn AI"
                          className={styles.avatar}
                        />
                      </div>
                      <div
                        className={`${styles.messageContent} ${styles.loading}`}
                      >
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
              </div>

              {showScrollBottom && (
                <button
                  className={styles.scrollToBottom}
                  onClick={() => {
                    scrollToBottom();
                    setShowScrollBottom(false);
                  }}
                  aria-label="Scroll to bottom"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="7 13 12 18 17 13"></polyline>
                    <polyline points="7 6 12 11 17 6"></polyline>
                  </svg>
                </button>
              )}
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.suggestions} data-lenis-prevent>
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

            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  className={styles.clearOverlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className={styles.clearModal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                    <p>Reset chat history?</p>
                    <div className={styles.modalActions}>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => setShowClearConfirm(false)}
                      >
                        No
                      </button>
                      <button
                        className={styles.confirmBtn}
                        onClick={handleClearChat}
                      >
                        Yes
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`${styles.chatButton} ${isOpen ? styles.menuOpen : ""}`}
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className={styles.iconContainer}>
          <motion.div
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.5 : 1,
              rotate: isOpen ? -90 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={styles.iconWrapper}
          >
            <img
              src="/icon.svg"
              alt="AI"
              width="24"
              height="24"
              className={styles.buttonIcon}
            />
          </motion.div>

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
