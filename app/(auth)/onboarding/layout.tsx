import React from 'react';

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Main Content grows to fill space */}
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;