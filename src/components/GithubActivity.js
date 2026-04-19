"use client";
import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import styles from "./GithubActivity.module.css";
import { getGithubStats } from "@/lib/github";

const theme = {
  light: ["#161b22", "#302a1f", "#5c503b", "#917e62", "#c4a882"],
  dark: ["#161b22", "#302a1f", "#5c503b", "#917e62", "#c4a882"],
};

export default function GithubActivity({ username }) {
  const [stats, setStats] = useState(null);
  const [selectedYear, setSelectedYear] = useState(0);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getGithubStats();
      if (data) setStats(data);
    };
    fetchStats();

    const currentYear = new Date().getFullYear();
    const yearList = ["Last Year"];
    for (let i = 0; i < 4; i++) {
      yearList.push(currentYear - i);
    }
    setYears(yearList);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year === "Last Year" ? 0 : year);
  };

  return (
    <div className={styles.activityContainer}>
      <div className={styles.header}>
        <div className={styles.userProfile}>
          <div className={styles.ghIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <div className={styles.userInfo}>
            <h3>GitHub Activity</h3>
            <p>@{username}</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats ? (
            <>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </span>
                <span className={styles.statValue}>{stats.public_repos}</span>
                <span>Repos</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </span>
                <span className={styles.statValue}>{stats.total_stars}</span>
                <span>Stars</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <circle cx="6" cy="19" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <path d="M12 8v8M6 16v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </span>
                <span className={styles.statValue}>{stats.total_forks}</span>
                <span>Forks</span>
              </div>
            </>
          ) : (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${styles.statItem} ${styles.shimmer}`}
                style={{ width: "100px", height: "40px" }}
              />
            ))
          )}
        </div>
      </div>

      <div className={styles.yearTabs}>
        {years.map((year) => (
          <button
            key={year}
            className={`${styles.yearTab} ${
              (selectedYear === 0 && year === "Last Year") ||
              selectedYear === year
                ? styles.activeYear
                : ""
            }`}
            onClick={() => handleYearChange(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className={styles.calendarWrapper}>
        {stats ? (
          <GitHubCalendar
            username={username}
            year={selectedYear || undefined}
            theme={theme}
            fontSize={14}
            blockSize={15}
            blockMargin={4}
            hideMonthLabels={false}
            hideColorLegend={false}
            hideTotalCount={false}
          />
        ) : (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Fetching contribution data...</p>
          </div>
        )}
      </div>
    </div>
  );
}
