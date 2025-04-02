// pages/dashboard.tsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCards from "../components/DashboardCards";
import RecentActivities from "../components/RecentActivities";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-6">
          <DashboardCards />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
