// src/layout/AdminLayout.jsx
import Sidebar from '../Components/Sidebar.jsx';
import Header from '../Components/Header.jsx';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;