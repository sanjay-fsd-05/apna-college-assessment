import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "js-cookie";

const Home = () => {
  const fullName = Cookies.get("fullName");
  const email = Cookies.get("email");
  return (
    <>
      <Navbar />
      <div style={{ margin: "50px 17%" }}>
        <h2>Welcome, {fullName}</h2>
        <p>Email: {email}</p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
