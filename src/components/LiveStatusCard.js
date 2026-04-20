"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TechIcon from "./TechIcons";
import styles from "./LiveStatusCard.module.css";

const DISCORD_ID = "601347669105049600";

export default function LiveStatusCard() {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!presence) return "#94a3b8";
    switch (presence.discord_status) {
      case "online": return "#22c55e";
      case "idle": return "#f59e0b";
      case "dnd": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const getStatusLabel = () => {
    if (!presence) return "Loading...";
    switch (presence.discord_status) {
      case "online": return "Online";
      case "idle": return "Idle / Away";
      case "dnd": return "Busy / DND";
      default: return "Currently Away";
    }
  };

  const activity = presence?.activities.find(a => a.type === 0) || presence?.activities[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.card}
    >
      <div className={styles.topInfo}>
        <div className={styles.dotWrapper}>
          <div 
            className={styles.dot} 
            style={{ backgroundColor: getStatusColor(), boxShadow: `0 0 10px ${getStatusColor()}80` }}
          />
          <div 
            className={styles.dotPulse} 
            style={{ backgroundColor: getStatusColor() }}
          />
        </div>
        <span className={styles.statusText}>
          {getStatusLabel().toUpperCase()}
        </span>
        {presence?.discord_status !== "offline" && (
          <div className={styles.liveIndicator}>
            <div className={styles.signal}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className={styles.liveLabel}>LIVE</span>
          </div>
        )}
      </div>

      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          {presence?.discord_user?.avatar ? (
            <img 
              src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${presence.discord_user.avatar}.webp?size=160`}
              alt="Coflyn"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder} />
          )}
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>Coflyn (Raffi Andhika)</h4>
          {presence?.activities?.find(a => a.type === 4) && (
            <p className={styles.customStatus}>
              {presence.activities.find(a => a.type === 4).state}
            </p>
          )}
        </div>
      </div>

      <div className={styles.activitySection}>
        {presence?.activities?.find(a => a.type === 0 || a.name === "Spotify") ? (
          <div className={styles.activityBox}>
            {presence.activities.find(a => a.name === "Spotify") ? (
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <TechIcon name="Spotify" style={{ color: "#1DB954" }} />
                </div>
                <div className={styles.activityText}>
                  <span className={styles.activityLabel}>LISTENING TO SPOTIFY</span>
                  <span className={styles.activityValue}>{presence.spotify?.song || "Unknown Song"}</span>
                  <span className={styles.activityDetail}>by {presence.spotify?.artist || "Unknown Artist"}</span>
                </div>
              </div>
            ) : (
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  {presence.activities.find(a => a.type === 0)?.name.includes("Visual Studio Code") ? (
                    <TechIcon name="VSCode" />
                  ) : (
                    <span>🕹️</span>
                  )}
                </div>
                <div className={styles.activityText}>
                  <span className={styles.activityLabel}>
                    {presence.activities.find(a => a.type === 0)?.name.includes("Visual Studio Code") ? "DEVELOPING" : "CURRENTLY PLAYING"}
                  </span>
                  <span className={styles.activityValue}>{presence.activities.find(a => a.type === 0)?.name}</span>
                  <span className={styles.activityDetail}>
                    {presence.activities.find(a => a.type === 0)?.details || presence.activities.find(a => a.type === 0)?.state}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.idleState}>
            <div className={styles.idleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <p>Taking a break to recharge.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
