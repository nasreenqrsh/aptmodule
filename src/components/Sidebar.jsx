// src/components/Sidebar.jsx
import React from "react";

const menuItems = [
  { icon: "services.svg", label: "Services" },
  { icon: "booked.svg", label: "Booked" },
  { icon: "confirmed.png", label: "Confirmed" },
  { icon: "ongoing.png", label: "Ongoing" },
  { icon: "completed.svg", label: "Completed" },
  { icon: "paymentpend.svg", label: "Payment Pending" },
  { icon: "reports.svg", label: "Reports" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow h-full p-4 space-y-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <img src={`/images/${item.icon}`} alt={item.label} className="h-6 w-6" />
            <span className="text-gray-700 text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
