"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      <div className={styles.header}>
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
          {getStatusLabel()}
        </span>
      </div>


      <div className={styles.content}>
        <h4 className={styles.name}>Coflyn (Raffi Andhika)</h4>
        <p className={styles.activity}>
          {activity ? (
            <>
              {activity.emoji && <span className={styles.emoji}>{activity.emoji.name}</span>}
              {activity.name === "Custom Status" ? activity.state : `Playing ${activity.name}`}
            </>
          ) : (
            presence?.discord_status === "online" ? "Active on Discord" : "Taking a break"
          )}
        </p>
      </div>

      {presence?.discord_status !== "offline" && (
        <div className={styles.indicator}>
          <div className={styles.signal}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className={styles.liveLabel}>LIVE</span>
        </div>
      )}
    </motion.div>
  );
}
