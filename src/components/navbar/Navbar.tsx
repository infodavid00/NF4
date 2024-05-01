import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Studier</span>
      </div>
      <div className="icons">
        <div className="notification">
          <Link to="/">
          <img src="/notifications.svg" alt="" />
          <span>3</span>
          </Link>
        </div>
        <div className="user">
        <Link to="/login">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          </Link>
          <span>Naif</span>
        </div>
        <Link to="/userprofile">
        <img src="/settings.svg" alt="" className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
