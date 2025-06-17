import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      {/* Add your Dashboard Sidebar / Navbar here */}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
