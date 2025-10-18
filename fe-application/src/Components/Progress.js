import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Loader = ({ size = 20, color = "#000" }) => {
  const lines = [...Array(12)];

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {lines.map((_, i) => {
        const angle = i * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size * 0.1,
              height: size * 0.3,
              backgroundColor: color,
              top: size * 0.1,
              left: size * 0.45,
              borderRadius: 1,
              transformOrigin: `1px ${size * 0.45}px`,
              transform: `rotate(${angle}deg) translateY(-${size * 0.1}px)`,
              animation: "fade 1.2s linear infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
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
};

const Progress = () => {
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `https://apna-college-backend.vercel.app/topics/progress/${Cookies.get("studentId")}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        await setReports(res.data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "70px 17%",
          gap: 10,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h4>Progress Reports</h4>
        <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          Easy: {isLoading ? <Loader /> : reports?.Easy}
        </p>
        <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          Medium: {isLoading ? <Loader /> : reports?.Medium}
        </p>
        <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          Hard: {isLoading ? <Loader /> : reports?.Hard}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Progress;
