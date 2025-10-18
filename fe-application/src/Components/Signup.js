import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.fullName || !details.email || !details.password) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const response = await axios.post(
        "https://apna-college-backend.vercel.app/students/register",
        details
      );
      console.log("Response data:", response.data);
      console.log("triggered", {
        status: response.status,
        message: response.data.message,
      });
      setStatusMessage({
        status: response.status,
        message: response.data.message,
      });
      await setTimeout(() => {
        navigate("/login");
        setDetails({ fullName: "", email: "", password: "" });
        setStatusMessage(null);
      }, 1500);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Signup failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>Fullname</label>
          <input
            name="fullName"
            type="fullname"
            placeholder="Enter your fullname"
            onChange={handleChange}
            value={details.fullName}
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={details.email}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={details.password}
          />
          <button type="submit">Signup</button>
        </form>
        <p style={{ fontSize: "12px", marginTop: "5px", textAlign: "Center" }}>
          Already having an account.? <Link to="/login">Login</Link>
        </p>
        {statusMessage !== null && (
          <p
            style={{
              textAlign: "center",
              color: "green",
              marginTop: "10px",
              fontWeight: "500",
            }}
          >
            {statusMessage.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
