import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // npm install js-cookie

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.email || !details.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "https://apna-college-backend.vercel.app/students/login",
        details
      );

      Cookies.set("token", res.data.token, { expires: 1 });
      Cookies.set("studentId", res.data.studentId);
      Cookies.set("fullName", res.data.fullName);
      Cookies.set("email", res.data.email);

      setStatusMessage({ message: "LoggedIn Successfull" });
      console.log("Login response:", res.data);
      await setTimeout(() => {
        navigate("/profile", { replace: true });
        setDetails({ email: "", password: "" });
        setStatusMessage(null);
      }, 1500);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={details.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={details.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
        <p style={{ fontSize: "12px", marginTop: "5px", textAlign: "Center" }}>
          Don't have an account.? <Link to="/sign-up">Sign up</Link>
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
