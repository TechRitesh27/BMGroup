// src/components/Header.jsx
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">Hotel Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <button className="profile-btn">Profile</button>
      </div>
    </header>
  );
};

export default Header;