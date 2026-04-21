"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Critical Runtime Error:", error);
  }, [error]);

  return (
    <div style={{
      padding: "100px 20px",
      textAlign: "center",
      background: "#0a0a0a",
      color: "#fafafa",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif"
    }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Something went wrong!</h2>
      <p style={{ color: "#a0a0a0", marginBottom: "30px", maxWidth: "500px" }}>
        {error.message || "An unexpected error occurred in the client-side code."}
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: "#c4a882",
          color: "#0a0a0a",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Try again
      </button>
    </div>
  );
}
