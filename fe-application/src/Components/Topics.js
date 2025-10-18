import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Cookies from "js-cookie";
import Accordion from "./Accordian";
import Loader from "./Loader";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState({
    studentId: Cookies.get("studentId"),
    token: Cookies.get("token"),
  });

  const fetchTopics = async () => {
    const res = await axios.get(
      `https://apna-college-backend.vercel.app/topics/${studentDetails?.studentId}`,
      {
        headers: {
          Authorization: `Bearer ${studentDetails?.token}`,
        },
      }
    );
    let grouped = {};
    await res.data.forEach((item) => {
      const mainTopic = item.topicId.mainTopic;
      if (!grouped[mainTopic]) {
        grouped[mainTopic] = [];
      }
      grouped[mainTopic].push(item);
    });

    let result = await Object.keys(grouped).map((key) => ({
      mainTopic: key,
      topics: grouped[key],
    }));
    await setTopics(result);
    await setIsLoading(false);
  };

  useEffect(() => {
    setStudentDetails({
      studentId: Cookies.get("studentId"),
      token: Cookies.get("token"),
    });
    fetchTopics();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading && <Loader />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "Center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h2 style={{ color: "#2f3e46" }}>Topics</h2>
        <p style={{ color: "#84a98c" }}>Explore these existing topics</p>
        <Accordion data={topics} fetchTopics={fetchTopics} />
      </div>
      <Footer />
    </>
  );
};

export default Topics;
