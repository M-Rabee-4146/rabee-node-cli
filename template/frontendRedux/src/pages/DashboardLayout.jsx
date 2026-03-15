import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 w-full h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
