// components/RecentActivities.tsx
import React from "react";

const RecentActivities = () => {
  const activities = [
    { title: "Books Uploaded", count: 5, items: ["Dynamics of Growth", "Ministry & Money Matters"] },
    { title: "Readers Signups", count: 12, items: ["@MannyWell", "@CapitaReader"] },
    { title: "Transactions", count: 5, items: ["A book was sold", "Printed copy for a book was ordered"] },
  ];

  return (
    <div className="space-y-6 mt-8">
      {activities.map((activity, index) => (
        <div key={index} className="bg-[#F3E0C5] p-6 rounded-lg shadow-md">
          <div className="text-lg font-semibold">{activity.title}</div>
          <div className="mt-4">
            <ul className="space-y-2">
              {activity.items.map((item, idx) => (
                <li key={idx} className="text-sm text-[#9B6B3C]">{item}</li>
              ))}
            </ul>
            <button className="mt-4 text-[#9B6B3C] text-sm">View All</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;
