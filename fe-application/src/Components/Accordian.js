import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Accordion({ data, fetchTopics }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [loadingRows, setLoadingRows] = useState({}); // Track loading per row

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const styles = {
    wrapper: { width: "100%", maxWidth: 900, margin: "24px" },
    item: {
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(47, 62, 70, 0.25)",
      marginBottom: 20,
      overflow: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 28px",
      cursor: "pointer",
      userSelect: "none",
      backgroundColor: "#0ccaee",
    },
    title: { margin: 0, fontSize: "15px" },
    icon: () => ({
      marginLeft: 12,
      transition: "transform 220ms ease",
      transform: "rotate(0deg)",
      display: "inline-block",
      lineHeight: 1,
    }),
    contentOuter: (isOpen) => ({
      maxHeight: isOpen ? 2000 : 0,
      transition: "max-height 400ms ease",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#d6ebf6",
    }),
    contentInner: { padding: "0 20px 16px 20px", width: "95%" },
    subHeading: { margin: "12px 0", fontWeight: "600", fontSize: "14px" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "16px",
      borderRadius: "8px",
      borderRight: "1px solid lightgrey",
      borderLeft: "1px solid lightgrey",
      borderBottom: "1px solid lightgrey",
    },
    thead: { border: "1px solid lightgrey" },
    th: {
      padding: "8px",
      fontSize: "14px",
      textAlign: "center",
      backgroundColor: "#fff",
      borderTop: "1px solid lightgrey",
    },
    tdCheck: (rowIndex) => ({
      padding: "5px",
      background: rowIndex % 2 === 0 ? "#f0f0f0" : "#fff",
      fontSize: "13.5px",
      textAlign: "left",
      display: "flex",
      gap: "8px",
      alignItems: "center",
    }),
    td: (rowIndex) => ({
      padding: "5px",
      background: rowIndex % 2 === 0 ? "#f0f0f0" : "#fff",
      fontSize: "13.5px",
      textAlign: "center",
    }),
  };

  const handleStatus = async (tId) => {
    setLoadingRows((prev) => ({ ...prev, [tId]: true }));
    try {
      const res = await axios.put(
        `https://apna-college-backend.vercel.app/topics/${Cookies.get(
          "studentId"
        )}/${tId}`,
        null,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      if (res.status === 200 || res.status === 201) {
        fetchTopics();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRows((prev) => ({ ...prev, [tId]: false }));
    }
  };

  return (
    <div style={styles.wrapper} aria-label="Accordion component">
      {data.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div style={styles.item} key={item.mainTopic}>
            <div
              style={styles.header}
              role="button"
              aria-expanded={isOpen}
              tabIndex={0}
              onClick={() => toggle(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggle(idx);
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <h3 style={styles.title}>{item.mainTopic}</h3>{" "}
                <span
                  style={{
                    backgroundColor: item.topics.every((e) => e.status === "Done")
                      ? "green"
                      : "purple",
                    color: "#ffffff",
                    borderRadius: "9px",
                    padding: "0px 10px",
                    fontSize: "10px",
                    alignSelf: "flex-end",
                  }}
                >
                  {item.topics.every((e) => e.status === "Done")
                    ? "Done"
                    : "Pending"}
                </span>
              </div>
              <span style={styles.icon()} aria-hidden>
                {isOpen ? "▲" : "▼"}
              </span>
            </div>

            <div style={styles.contentOuter(isOpen)}>
              <div style={styles.contentInner}>
                <div style={styles.subHeading}>Subtopics</div>
                <table style={styles.table}>
                  <thead style={styles.thead}>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>LeetCode Link</th>
                      <th style={styles.th}>Youtube Link</th>
                      <th style={styles.th}>Article Link</th>
                      <th style={styles.th}>Level</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.topics.map((sub, rowIdx) => (
                      <tr key={sub.topicId.topicName}>
                        <td style={styles.tdCheck(rowIdx)}>
                          <input
                            type="checkbox"
                            checked={sub.status !== "Pending"}
                            onChange={() => handleStatus(sub.topicId._id)}
                            disabled={loadingRows[sub.topicId._id]}
                          />
                          {sub.topicId.topicName}
                          {loadingRows[sub.topicId._id] && (
                            <div style={{ position: "relative", width: 20, height: 20 }}>
                              {[...Array(12)].map((_, i) => {
                                const angle = i * 30;
                                return (
                                  <div
                                    key={i}
                                    style={{
                                      position: "absolute",
                                      width: 2,
                                      height: 6,
                                      backgroundColor: "#000", // black spinner
                                      top: 2,
                                      left: 9,
                                      borderRadius: 1,
                                      transformOrigin: "1px 9px",
                                      transform: `rotate(${angle}deg) translateY(-2px)`,
                                      animation: "fade 1.2s linear infinite",
                                      animationDelay: `${i * 0.1}s`,
                                    }}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </td>
                        <td style={styles.td(rowIdx)}>
                          <a
                            href={sub.topicId.leetcodeLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Practice
                          </a>
                        </td>
                        <td style={styles.td(rowIdx)}>
                          <a
                            href={sub.topicId.youtubeLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Watch
                          </a>
                        </td>
                        <td style={styles.td(rowIdx)}>
                          <a
                            href={sub.topicId.articleLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Read
                          </a>
                        </td>
                        <td style={styles.td(rowIdx)}>{sub.topicId.level}</td>
                        <td style={styles.td(rowIdx)}>{sub.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes fade {
          0%, 39%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
